import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SanityService } from '../../service/sanity.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, fadeInUpAnimation, fadeInDownAnimation, fadeInLeftAnimation  } from 'angular-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    fadeInUpAnimation(),
    fadeInDownAnimation(),
    fadeInLeftAnimation()
  ]
})
export class HomeComponent implements OnInit {
  
  about_details: any = [];
  animationState: Boolean = true;

  constructor( private sanityService: SanityService ) { }

  ngOnInit() {
    this.getAbout();
    this.animate();
  }

  animate(){
    setTimeout(() => {
      this.animationState = false;
    }, 500); 
    setTimeout(() => {
      this.animationState = true;
    }, 500); 
  }

  async getAbout() {
    let data = await this.sanityService.getAbout();
    this.about_details = data[0]

    this.about_details.thumbImageUrl = this.getImageUrl(this.about_details.mainImage.asset);
    this.about_details.backgroundImageUrl = this.getImageUrl(this.about_details.backgroundImage.asset);
    
  }

  private getImageUrl(source: any) {
    return this.sanityService.urlForImage(source)
  }

}
