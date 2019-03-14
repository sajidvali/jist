import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  title = 'frontend';
  public auth2: any;

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '3440031025-0ibqq9u77l693gj0ahrf815a86kt5cts.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
        width: 240,
        height: 50,
        theme: 'dark',
        longtitle: true
      });
      this.attachSignin(document.getElementById('signinBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        let user:User = new User(
          profile.getId(), 
          profile.getName(), 
          profile.getEmail(), 
          profile.getImageUrl(), 
          googleUser.getAuthResponse().id_token,
          "google"
        );
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        //YOUR CODE HERE
        //this.authService.login(user);
        // store user information in local storage and send id_token to server
        // server shall create user based on token and return a jwt auth token

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngOnInit() {
    this.googleInit();
  }

}
