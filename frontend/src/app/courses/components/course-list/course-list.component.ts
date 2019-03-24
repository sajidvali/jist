import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Course } from '../../models/course';
import { Category } from '../../models/category';
import { ContentService } from '../../services/content.service';

@Component({
   selector: 'course-list',
   templateUrl: './course-list.component.html',
   styleUrls: ['./course-list.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit {

   @Input('courses') courses: Array<Course> = [];
   @Input('categories') categories: Array<Category> = [];
   @Input('from') from: number = 0;
   @Input('to') to: number = 10;
   @Input('search') search: string = '';
   @Input('category') category: number = 0;
   @Input('onlymycourses') onlymycourses:boolean = false;

   mycourses: Array<number> = [];
   init:boolean = false;
   

   constructor(private contentService: ContentService, private changedetection:ChangeDetectorRef) { }

   isSubscribed(id: number) {
      return this.mycourses.includes(id);
   }

   getCategoryTitle(id: number) {
      return this.categories.find(x => x.id == id).title;
   }

   FilteredCourses():Array<Course> {
      return this.courses.filter
         (course => {
            return (this.search == '' || course.title.toLowerCase().includes(this.search.toLowerCase()))
               && (this.category == 0 || course.category == this.category)
               && (!this.onlymycourses || this.mycourses.includes(course.id));
         }).sort((a: Course, b: Course) => { return a.title < b.title ? -1 : 1 });
   }

   ngOnInit() {
      this.contentService.getMyCourses().subscribe(mycourses => {
         this.mycourses = mycourses;
         this.init = true;
         this.changedetection.detectChanges();
      });  
   }

}
