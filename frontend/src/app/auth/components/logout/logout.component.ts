import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
declare const gapi: any;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  loggedinUser:User;
  constructor(private authService: AuthService) { }

  public signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      this.authService.logout();
    });
  }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(user=>{this.loggedinUser = user;});
  }

}
