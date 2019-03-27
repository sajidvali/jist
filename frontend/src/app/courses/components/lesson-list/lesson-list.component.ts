import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { LessonAttempt } from '../../models/lessonattempt';
import { Course } from '../../models/course';

@Component({
   selector: 'lesson-list',
   templateUrl: './lesson-list.component.html',
   styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

   @Input('lessons') lessons: Array<Lesson> = [];
   @Input('from') from: number = 0;
   @Input('to') to: number = 10;
   @Input('search') search: string = '';
   @Input('display') display: number = 0;
   @Input('lessonattempts') lessonattempts: Array<LessonAttempt> = [];
   @Input('subscribed') subscribed: boolean = false;
   @Input('course') course:Course;


   constructor() { }

   getlessonattempt(l:Lesson):LessonAttempt {
      let a:LessonAttempt = null;
      if(this.lessonattempts) a = this.lessonattempts.find(x=>x.lesson==l.id)
      a = a || new LessonAttempt(l.id);
      return a;
   }

   FilteredLessons(): Array<Lesson> {
      return this.lessons.filter
         (lesson => {
            return (this.search == '' || lesson.title.toLowerCase().includes(this.search.toLowerCase()))
         });
      //TODO: handle display
   }

   ngOnInit() {
   }

}
