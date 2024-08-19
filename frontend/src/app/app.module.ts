import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'; // Import provideHttpClient and withFetch

import { LightboxModule } from 'ngx-lightbox';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMasonryModule } from 'ngx-masonry';
import { YouTubePlayer } from '@angular/youtube-player';

import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { NavbarComponent } from './modules/shared/navbar/navbar.component';
import { FooterComponent } from './modules/shared/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { ServicesComponent } from './modules/services/services.component';
import { PortfolioComponent } from './modules/portfolio/portfolio.component';
import { BlogComponent } from './modules/blog/blog.component';
import { ContactComponent } from './modules/contact/contact.component';
import { BlogSingleComponent } from './modules/blog-single/blog-single.component';
import { BottomNavbarComponent } from './modules/shared/bottom-navbar/bottom-navbar.component';
import { ModalComponent } from './modules/about/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    PortfolioComponent,
    PortfolioComponent,
    BlogComponent,
    ContactComponent,
    BlogSingleComponent,
    BottomNavbarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LightboxModule,
    CarouselModule,
    FormsModule, 
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule,
    MatButtonModule, 
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    SweetAlert2Module,
    NgxMasonryModule,
    YouTubePlayer,
    MatDialogModule,
    MatDialogActions, 
    MatDialogClose, 
    MatDialogContent, 
    MatDialogTitle
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent, AboutComponent]
})
export class AppModule { }
