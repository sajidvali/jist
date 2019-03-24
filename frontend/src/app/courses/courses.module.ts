import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CoursetileComponent } from './components/coursetile/coursetile.component';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CourseListComponent } from './components/course-list/course-list.component';

@NgModule({
  declarations: [HomeComponent, CoursetileComponent, CourseListComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatIconModule, MatCardModule, MatButtonModule, 
    MatListModule, MatPaginatorModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule,
    FormsModule, MatCheckboxModule
  ]
})
export class CoursesModule { }
