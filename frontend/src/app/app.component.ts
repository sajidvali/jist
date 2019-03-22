import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   user: SocialUser;

   constructor(private authService: AuthService, private router: Router) { }

   logout() {
      this.authService.logout();
      this.router.navigate(['/']);
   }

   ngOnInit() {
      this.authService.getLoggedInUser().subscribe(user => {
          this.user = user;
      });
   }
}
