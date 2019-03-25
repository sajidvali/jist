import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { ContentService } from '../../services/content.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
   selector: 'app-course',
   templateUrl: './course.component.html',
   styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

   course: Course;
   category: string;
   subscribed: boolean;
   image:any;
   lessons: Array<Lesson> = [];
   // MatPaginator Output
   pageindex: number = 0;
   pagesize: number = 10;
   searchText: string = '';
   display: number = 0;

   constructor(private router: Router, private contentService: ContentService, private sanitizer:DomSanitizer) {
      const navigation = this.router.getCurrentNavigation();
      this.course = navigation.extras.state.course;
      this.category = navigation.extras.state.category;
      this.subscribed = navigation.extras.state.subscribed;
      this.image = this.sanitizer.bypassSecurityTrustStyle(`url(${this.course.image})`);
   }

   ngOnInit() {
      this.contentService.getLessons(this.course.id, this.course.image).subscribe(lessons => { this.lessons = lessons });
   }

}
