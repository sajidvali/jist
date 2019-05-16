import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatMenuModule, MatSidenavModule, MatTreeModule, MatListModule, MatDividerModule, MatGridListModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { AboutComponent } from './components/about/about.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { LoggedinHomeComponent } from './components/loggedin-home/loggedin-home.component';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TestimonialComponent,
    TestimonialsComponent,
    LoggedinHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatTreeModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    VirtualScrollerModule,
    MatTooltipModule,
    ShareButtonsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
