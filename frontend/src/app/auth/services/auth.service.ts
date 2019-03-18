import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';
import { catchError, mapTo, tap,map } from 'rxjs/operators';
import { User } from '../models/user';
import { Tokens } from '../models/tokens';
import { SocialUser } from 'angularx-social-login';
import { AuthService as SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: User;
  private socialUser:SocialUser;
  constructor(private http: HttpClient, private socialAuthService:SocialAuthService, private router: Router) {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
    });
  }

  getCollegeList() {
    return this.http.get(`${config.apiUrl}/api/colleges/`);
  }

  getFieldOfStudyList() {
    return this.http.get(`${config.apiUrl}/api/studyfields/`);
  }

  getProfile() {
    return this.http.get(`${config.apiUrl}/interviewprep/profile/`);
  }

  updateProfile(data):Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/interviewprep/profile/`, data).pipe(
      mapTo(true),
      catchError(error => {
        return of(false);
      })
    );
  }

  // hasProfile(user:SocialUser): Observable<boolean> {
  //   return this.http.post<any>(`${config.apiUrl}/api/hasprofile/`, {'username':user.email})
  //     .pipe(
  //       tap(result=>this.loggedUser.hasProfile=result.status),
  //       map(result=>result.status),
  //       catchError(error => {
  //         //alert(error.error);
  //         return of(false);
  //       }));
  // }

  login(user: SocialUser): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/api/token/`, {'idtoken':user.idToken, 'provider':user.provider})
      .pipe(
        tap(tokens => this.doLoginUser(user, tokens)),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  // in future also check for profileon backend and see if that needs updated.
  // we can do it along with login or as a separate process.

  logout() {
    this.doLogoutUser();
  }

  userHasProfile():boolean {
    return this.loggedUser && this.loggedUser.hasProfile;
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // refreshes token, else logs in again, else logs out
  refreshToken(): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/api/token/refresh/`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap((tokens: Tokens) => {this.storeJwtToken(tokens.access);}),
      mapTo(true),
      catchError(e=> {
        if(this.socialUser) return this.login(this.socialUser);
        else {
          this.socialAuthService.signOut();
          this.logout();
          this.router.navigate(['/login']);
          return of(false);
        }})
    );
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private doLoginUser(user: SocialUser, tokens: Tokens) {
    this.loggedUser = new User(user);
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
}
