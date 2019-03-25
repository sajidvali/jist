import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../../models/lesson';

@Component({
   selector: 'lesson-tile',
   templateUrl: './lesson-tile.component.html',
   styleUrls: ['./lesson-tile.component.scss']
})
export class LessonTileComponent implements OnInit {

   @Input('lesson') lesson: Lesson;
   @Input('subscribed') subscribed:boolean = false;
   
   constructor() { }

   ngOnInit() {
   }

}
