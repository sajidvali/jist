import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'coursetile',
  templateUrl: './coursetile.component.html',
  styleUrls: ['./coursetile.component.scss']
})
export class CoursetileComponent implements OnInit {

  constructor(private contentService: ContentService) { }
  @Input('course') course: Course;
  @Input('subscribed') subscribed: boolean;
  @Input('category') category: string;

  @Output() didsubscribe = new EventEmitter();

  subscribe() {
     this.contentService.subscribeCourse(this.course.id).subscribe(()=>{
        this.subscribed = true;
        this.didsubscribe.emit();
     })
  }

  ngOnInit() {
     if(!this.course.image || this.course.image=='') {
        this.course.image = this.course.category==2? '/assets/images/technicalcourse.jpg' : '/assets/images/othercourse.jpg';
     }
  }

}
