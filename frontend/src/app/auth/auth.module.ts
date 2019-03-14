import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CourseGuard } from './guards/course.guard';
import { TokenInterceptor } from './token.interceptor';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  providers: [
    AuthGuard, AuthService, CourseGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[LoginComponent, LogoutComponent]
})
export class AuthModule { }
