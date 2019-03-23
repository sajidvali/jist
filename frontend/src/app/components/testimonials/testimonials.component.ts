import { Component, OnInit, ViewChild } from '@angular/core';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';

@Component({
   selector: 'testimonials',
   templateUrl: './testimonials.component.html',
   styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

   testimonials: any;
   endIndex: number;
   @ViewChild('scroll') scroller: VirtualScrollerComponent;
   current: number = 0;
   constructor() {
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
            text: "Interview Prep is an excellent platform to give much needed practice to an individual. Interview Prep is an excellent platform to give much needed practice to an individual."
         },
         {
            name: "Ranbir Sinha",
            image: "assets/images/avatar1.png",
            affiliation: "CEO, Sinha Research, Switzerland",
            text: "Interview Prep is an excellent platform to give much needed practice to an individual. Interview Prep is an excellent platform to give much needed practice to an individual. Interview Prep is an excellent platform to give much needed practice to an individual. Interview Prep is an excellent platform to give much needed practice to an individual."
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

   canscrollnext():boolean {
      return this.endIndex != this.testimonials.length-1; 
   }

   canscrollprevious():boolean {
      return this.current > 0; 
   }

   scrollnext() {
      this.current = this.endIndex+1;
      this.current = Math.min(this.testimonials.length - 1, this.current);
      this.scroller.scrollToIndex(this.current);  
   }

   scrollprevious() {
      this.current -= (this.endIndex-this.current+1);
      this.current = Math.max(0, this.current);
      this.scroller.scrollToIndex(this.current);  
   }

   ngOnInit() {
      this.scroller.vsEnd.subscribe(l=>{
         this.endIndex = l.endIndex;
      })
   }

}
