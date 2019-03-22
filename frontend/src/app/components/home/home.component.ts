import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   user:any;
   testimonials:any;
   constructor(private authService: AuthService) {
      this.testimonials = [
         {
            name: "Ranbir Sinha",
            image: "assets/images/avatar1.png",
            affiliation: "CEO, Sinha Research, Switzerland",
            text: "Interview Prep is an excellent platform to give much needed practice to an individual."
         },
         {
            name: "Satish Paruchuri",
            image: "assets/images/avatar1.png",
            affiliation: "T&P Head, Sri Vishnu Education Society",
            text: "Interview Prep is an excellent platform to give much needed practice to an individual."
         },
         {
            name: "Ranbir Sinha",
            image: "assets/images/avatar1.png",
            affiliation: "CEO, Sinha Research, Switzerland",
            text: "Interview Prep is an excellent platform to give much needed practice to an individual."
         },
         {
            name: "Satish Paruchuri",
            image: "assets/images/avatar1.png",
            affiliation: "T&P Head, Sri Vishnu Education Society",
            text: "Interview Prep is an excellent platform to give much needed practice to an individual."
         },
         {
            name: "Ranbir Sinha",
            image: "assets/images/avatar1.png",
            affiliation: "CEO, Sinha Research, Switzerland",
            text: "Interview Prep is an excellent platform to give much needed practice to an individual."
         },
         {
            name: "Satish Paruchuri",
            image: "assets/images/avatar1.png",
            affiliation: "T&P Head, Sri Vishnu Education Society",
            text: "Interview Prep is an excellent platform to give much needed practice to an individual."
         }
      ];
   }

  ngOnInit() {
   this.authService.getLoggedInUser().subscribe(user => {
      this.user = user;
  });
  }

}
