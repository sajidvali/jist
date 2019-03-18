import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService } from 'angularx-social-login';
import { AuthService } from '../../services/auth.service';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: SocialUser;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      if(user!=null) {
        console.log(user);
        if(this.authService.isLoggedIn()) this.authService.logout(); // clear tokens from past TODO: handle token timeouts
        this.authService.login(this.user).subscribe(state=>{
          if(state) {
            this.router.navigate(['/courses']);
          }
        });
      }
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
    this.authService.logout();
  }

}
