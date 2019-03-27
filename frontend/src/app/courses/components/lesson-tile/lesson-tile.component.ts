import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { LessonAttempt } from '../../models/lessonattempt';
import { config } from 'src/app/config';
import { Course } from '../../models/course';

@Component({
   selector: 'lesson-tile',
   templateUrl: './lesson-tile.component.html',
   styleUrls: ['./lesson-tile.component.scss']
})
export class LessonTileComponent implements OnInit {

   @Input('lesson') lesson: Lesson;
   @Input('lessonattempt') lessonattempt: LessonAttempt;
   @Input('subscribed') subscribed: boolean = false;
   @Input('course') course:Course;
   lessonImage: string;
   constructor() { }

   ngOnInit() {
      this.lessonImage = this.lesson.image;
      if (!this.lesson.image || this.lesson.image == '') this.lessonImage = config.defaultimage;
   }

}
