import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthService as SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user:SocialUser;
  
  constructor(private authService:AuthService, private socialAuthService: SocialAuthService, private router: Router) {}

  logout() {
    this.socialAuthService.signOut();
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
    });
  }
}
