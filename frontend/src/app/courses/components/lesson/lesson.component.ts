import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lesson } from '../../models/lesson';
import { ContentService } from '../../services/content.service';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from 'src/app/config';
import { LessonAttempt } from '../../models/lessonattempt';
import { Question } from '../../models/question';
import { Attempt } from '../../models/attempt';
import { Course } from '../../models/course';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { QuestionComponent } from '../question/question.component';
import {MatDialog} from '@angular/material';

export interface QuestionAttempt {
   title: string;
   attempts: number;
   score: number;
   question: Question;
   attempt: Attempt;
}

@Component({
   selector: 'app-lesson',
   templateUrl: './lesson.component.html',
   styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

   lesson: Lesson;
   course: Course;
   lessonAttempt: LessonAttempt;
   questions: Array<Question> = [];
   attempts: Array<Attempt> = []
   image: any;
   init: number = 0;
   // pageindex: number = 0;
   // pagesize: number = 10;
   // searchText: string = '';
   // display: number = 0;
   dataSource: MatTableDataSource<QuestionAttempt>;
   displayedColumns: string[] = ['title', 'attempts', 'score', 'performance'];

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

   constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private contentService: ContentService,
      private sanitizer: DomSanitizer) {
      const navigation = this.router.getCurrentNavigation();
      if (!navigation || !navigation.extras.state) return;
      this.lesson = navigation.extras.state.lesson;
      this.course = navigation.extras.state.course;
      this.image = this.resolveImage(this.lesson.image);
   }

   resolveImage(i: string) {
      if (!i || i == '') i = config.defaultimage;
      return this.sanitizer.bypassSecurityTrustStyle(`url(${i})`);;
   }

   createNewQA(question: Question, attempt: Attempt): QuestionAttempt {
      return {
         title: question.title,
         attempts: attempt.count,
         score: attempt.score,
         question: question,
         attempt: attempt
      };
   }

   preparedata(): Array<QuestionAttempt> {
      let data = new Array<QuestionAttempt>();
      for (let i = 0; i < this.questions.length; i++) {
         data.push(this.createNewQA(this.questions[i], this.getquestionattempt(this.questions[i])))
      }
      console.log(data);
      return data;
   }
 
   getquestionattempt(q: Question): Attempt {
      let a: Attempt = null;
      if (this.attempts) a = this.attempts.find(x => x.question == q.id)
      a = a || new Attempt(q.id);
      return a;
   }

   setup() {
      this.init++;
      if (this.init == 2) {
         console.log("preparing data");
         this.dataSource = new MatTableDataSource<QuestionAttempt>(this.preparedata());
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      }
   }

   getperf(row:QuestionAttempt) {
      if(row.attempt.count==0) return 0;
      return row.attempt.totalscore/(row.question.score*row.attempt.count)
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   openQuestionAttempt(curr_question: Question, curr_attempt: Attempt) {
      const dialogRef = this.dialog.open(QuestionComponent,{panelClass: 'full-width-dialog',
         width:"75%",
         // height:"90%"
         data : {
            question : curr_question,
            attempt : curr_attempt,
         }
      });
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
   }

   ngOnInit() {
      if (!this.lesson) {
         this.route.params.subscribe(params => {
            this.contentService.getCourse(params['course']).subscribe(data => {
               this.course = data["course"];
               this.contentService.getLesson(params['lesson']).subscribe(data => {
                  this.lesson = data["lesson"];
                  this.lessonAttempt = data["attempt"];
                  this.image = this.resolveImage(this.lesson.image)
                  this.contentService.getQuestions(this.course.id, this.lesson.id).subscribe(questions => { this.questions = questions; this.setup() });
                  this.contentService.getAttempts(this.course.id, this.lesson.id).subscribe(attempts => { this.attempts = attempts; this.setup() });
               })
            })
         })
      } else {
         this.contentService.getQuestions(this.course.id, this.lesson.id).subscribe(questions => { this.questions = questions; this.setup() });
         this.contentService.getAttempts(this.course.id, this.lesson.id).subscribe(attempts => { this.attempts = attempts; this.setup() });
      }
   }

}
