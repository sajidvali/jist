import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';
import { Course } from '../models/course';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';
import { Lesson } from '../models/lesson';
import { CourseAttempt } from '../models/courseattempt';
import { LessonAttempt } from '../models/lessonattempt';
import { Question } from '../models/question';
import { Attempt } from '../models/attempt';

@Injectable({
   providedIn: 'root'
})
export class ContentService {

   constructor(private http: HttpClient) { }

   getCourse(courseid:number): Observable<any> {
      return this.http.get<any>(`${config.apiUrl}/interviewprep/getcourse/${courseid}/`);
   }

   getLesson(lessonid:number): Observable<any> {
      return this.http.get<any>(`${config.apiUrl}/interviewprep/getlesson/${lessonid}/`);
   }

   getCourses(): Observable<Array<Course>> {
      return this.http.get<Array<Course>>(`${config.apiUrl}/interviewprep/courses/`);
   }
   getCategories(): Observable<Array<Category>> {
      return this.http.get<Array<Category>>(`${config.apiUrl}/interviewprep/categories/`);
   }
   getMyCourses(): Observable<Array<CourseAttempt>> {
      return this.http.get<Array<CourseAttempt>>(`${config.apiUrl}/interviewprep/mycourses/`);
   }

   getLessonAttempts(courseid:number): Observable<Array<LessonAttempt>> {
      return this.http.get<Array<LessonAttempt>>(`${config.apiUrl}/interviewprep/lessonattempts/${courseid}/`);
   }

   getLessons(courseid:number): Observable<Array<Lesson>> {
      return this.http.get<Array<Lesson>>(`${config.apiUrl}/interviewprep/lessons/${courseid}/`);
   }

   getQuestions(courseid: number, lessonid:number): Observable<Array<Question>> {
      return this.http.get<Array<Question>>(`${config.apiUrl}/interviewprep/questions/${courseid}/${lessonid}/`);
   }

   getAttempts(courseid: number, lessonid:number): Observable<Array<Attempt>> {
      return this.http.get<Array<Attempt>>(`${config.apiUrl}/interviewprep/attempts/${courseid}/${lessonid}/`);
   }

   subscribeCourse(id: number): Observable<CourseAttempt> {
      return this.http.post<any>(`${config.apiUrl}/interviewprep/subscribecourse/`, {"courseid":id});
   }
}
