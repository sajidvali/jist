import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CoursetileComponent } from './components/coursetile/coursetile.component';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatTableModule, MatSortModule, MatProgressBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { LessonTileComponent } from './components/lesson-tile/lesson-tile.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionTileComponent } from './components/question-tile/question-tile.component';

@NgModule({
  declarations: [HomeComponent, CoursetileComponent, CourseListComponent, CourseComponent, LessonListComponent, LessonTileComponent, LessonComponent, QuestionListComponent, QuestionTileComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatIconModule, MatCardModule, MatButtonModule, 
    MatListModule, MatPaginatorModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule,
    FormsModule, MatCheckboxModule, MatTableModule, MatSortModule, MatProgressBarModule
  ]
})
export class CoursesModule { }
