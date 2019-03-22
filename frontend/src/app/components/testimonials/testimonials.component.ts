import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';

@Component({
   selector: 'testimonials',
   templateUrl: './testimonials.component.html',
   styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

   @Input('data') testimonials: any;
   @ViewChild('scroll') scroller: VirtualScrollerComponent;
   current: number = 0;
   constructor() {

   }

   scrollnext(i: number) {
      this.current += i;
      this.current = Math.max(0, this.current);
      this.current = Math.min(this.testimonials.length - 1, this.current);
      console.log(this.current);
      this.scroller.scrollToIndex(this.current);
   }

   ngOnInit() {
   }

}
