import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson } from '../../models/lesson';

@Component({
   selector: 'app-lesson',
   templateUrl: './lesson.component.html',
   styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

   lesson: Lesson;
   
   constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      this.lesson = navigation.extras.state.lesson;
   }

   ngOnInit() {
   }

}
