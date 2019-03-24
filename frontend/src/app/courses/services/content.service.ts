import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';
import { Course } from '../models/course';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { catchError, mapTo, map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class ContentService {

   constructor(private http: HttpClient) { }

   getCourses(): Observable<Array<Course>> {
      return this.http.get<Array<Course>>(`${config.apiUrl}/interviewprep/courses/`);
   }
   getCategories(): Observable<Array<Category>> {
      return this.http.get<Array<Category>>(`${config.apiUrl}/interviewprep/categories/`);
   }
   getMyCourses(): Observable<Array<number>> {
      return this.http.get<Array<number>>(`${config.apiUrl}/interviewprep/mycourses/`).pipe(
         map(res => res.map(item => item["id"]))
      );
   }

   subscribeCourse(id: number): Observable<boolean> {
      return this.http.post<any>(`${config.apiUrl}/interviewprep/subscribecourse/`, {"courseid":id}).pipe(
         mapTo(true),
         catchError(error => {
            return of(false);
         })
      );
   }
}
