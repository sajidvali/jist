import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import { ContentService } from '../../services/content.service';
import { CourseAttempt } from '../../models/courseattempt';

@Component({
   selector: 'course-list',
   templateUrl: './course-list.component.html',
   styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

   @Input('courses') courses: Array<Course> = [];
   @Input('from') from: number = 0;
   @Input('to') to: number = 10;
   @Input('search') search: string = '';
   @Input('category') category: string = 'All';
   @Input('onlymycourses') onlymycourses:boolean = false;

   mycourses: Array<CourseAttempt> = [];
   init:boolean = false;
   

   constructor(private contentService: ContentService) { }

   isSubscribed(id: number) {
      return this.mycourses.length>0? this.mycourses.find(x=>x.course==id) : false;
   }

   FilteredCourses():Array<Course> {
      return this.courses.filter
         (course => {
            return (this.search == '' || course.title.toLowerCase().includes(this.search.toLowerCase()))
               && (this.category == 'All' || course.category == this.category)
               && (!this.onlymycourses || this.isSubscribed(course.id));
         }).sort((a: Course, b: Course) => { return a.title < b.title ? -1 : 1 });
   }

   ngOnInit() {
      this.contentService.getMyCourses().subscribe(mycourses => {
         this.mycourses = mycourses;
         this.init = true;
      });  
   }

}
