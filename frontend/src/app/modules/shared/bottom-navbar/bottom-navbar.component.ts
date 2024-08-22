import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.css'
})
export class BottomNavbarComponent  implements OnInit {
  isHome: Boolean = false;
  isAbout: Boolean = false;
  isBlog: Boolean = false;
  iscontact: Boolean = false;

  constructor(private router: Router) {}


  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveStates();
      }
    });
  }

  updateActiveStates() {
    // Update the logic here based on your actual routes
    this.setAllFalse();
    this.isHome = this.router.url.startsWith('/home') || this.router.url === '/';
    this.isAbout = this.router.url.startsWith('/about');
    this.isBlog = this.router.url.startsWith('/blog');
    this.iscontact = this.router.url.startsWith('/contact');
  }

  setAllFalse(){
    this.isHome = false;
    this.isAbout = false;
    this.isBlog = false;
    this.iscontact = false;
  }
}
