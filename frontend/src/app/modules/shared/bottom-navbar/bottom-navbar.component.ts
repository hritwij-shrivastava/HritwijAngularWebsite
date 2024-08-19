import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.css'
})
export class BottomNavbarComponent  implements OnInit {
  isHome: Boolean = false;
  isInsights: Boolean = false;
  isAboutus: Boolean = false;
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
    this.setAllFalse()
    console.log()
    this.isHome = this.router.url.startsWith('/home') || this.router.url === '/';
    this.isInsights = this.router.url.startsWith('/insights');
    this.isAboutus = this.router.url.startsWith('/about-us');
    this.iscontact = this.router.url.startsWith('/contact');
  }

  setAllFalse(){
    this.isHome = false;
    this.isInsights = false;
    this.isAboutus = false;
    this.iscontact = false;
  }
}
