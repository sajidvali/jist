import { Component, OnInit, Input } from '@angular/core';
const maxlen:number = 250;
@Component({
   selector: 'testimonial',
   templateUrl: './testimonial.component.html',
   styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

   
   @Input('data') data: any;
   constructor() { }
   formattedTooltip(t: string) {
      if (t.length <= maxlen) return '';
      return t;
   }

   formattedText(t: string) {
      if (t.length <= maxlen) return t;
      return t.substr(0, maxlen) + '...';
   }
   ngOnInit() {
   }

}
