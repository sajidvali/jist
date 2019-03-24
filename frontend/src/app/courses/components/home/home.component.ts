import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Category } from '../../models/category';
import { Course } from '../../models/course';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   courses: Array<Course> = [];
   categories: Array<Category> = [];
   // MatPaginator Output
   pageindex: number = 0;
   pagesize: number = 10;
   searchText: string = '';
   selectedCategory: number = 0;
   onlymycourses:boolean = false;

   constructor(private contentService: ContentService) { 

   }

   ngOnInit() {
      this.contentService.getCategories().subscribe(categories => {
         this.categories = categories
      });

      this.contentService.getCourses().subscribe(courses => { this.courses = courses});
   }

}
