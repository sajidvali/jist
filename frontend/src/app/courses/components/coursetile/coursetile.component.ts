import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course';
import { ContentService } from '../../services/content.service';
import { CourseAttempt } from '../../models/courseattempt';
import { config } from 'src/app/config';

@Component({
  selector: 'coursetile',
  templateUrl: './coursetile.component.html',
  styleUrls: ['./coursetile.component.scss']
})
export class CoursetileComponent implements OnInit {

  constructor(private contentService: ContentService) { }
  @Input('course') course: Course;
  @Input('subscribed') subscribed: CourseAttempt = null;
  courseImage:string;

  @Output() didsubscribe = new EventEmitter();

  subscribe() {
     this.contentService.subscribeCourse(this.course.id).subscribe((x)=>{
        this.subscribed = x;
        this.didsubscribe.emit({event:event, attempt:x});
     })
  }

  

  ngOnInit() {
    this.courseImage = this.course.image;
    if (!this.course.image || this.course.image=='') this.courseImage = config.defaultimage;
  }

}
