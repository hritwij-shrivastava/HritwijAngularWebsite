import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  showAbout: Boolean = false;
  showSkill: Boolean = false;
  showContact: Boolean = false;
  showEdu: Boolean = false;
  showExp: Boolean = false;

  partnerOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 50,
    navText: ['', ''],
    autoWidth: true,
    stagePadding: 100, 
    rtl: false,
    margin: 30,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.showAbout = true;
    this.showEdu = true;
  }

  onAbout(){
    this.setAllFalse();
    this.showAbout = true;
  }

  onSkill(){
    this.setAllFalse();
    this.showSkill = true;
  }

  onContact(){
    this.setAllFalse();
    this.showContact = true;
  }

  private setAllFalse(){
    this.showAbout = false;
    this.showSkill = false;
    this.showContact = false;
  }

  onEdu(){
    this.setAllExpFalse();
    this.showEdu = true;
  }

  onExp(){
    this.setAllExpFalse();
    this.showExp = true;
  }

  private setAllExpFalse(){
    this.showEdu = false;
    this.showExp = false;
  }
}
