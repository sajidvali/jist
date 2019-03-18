import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseGuard } from './auth/guards/course.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { AuthComponent } from './auth/components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'courses',
    loadChildren: './courses/courses.module#CoursesModule',
    canActivate: [CourseGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
