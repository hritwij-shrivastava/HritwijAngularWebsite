import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  expandNavBtn = false;
  isHome = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Handle dropdown active state on route change
        this.updateActiveStates();
      }
    });
  }

  updateActiveStates() {
    // Update the logic here based on your actual routes
    this.isHome = this.router.url=='/home' || this.router.url=='/' || this.router.url=='';
  }

  expandNav() {
    this.expandNavBtn = !this.expandNavBtn
  }
}
