import { Component, OnInit } from '@angular/core';
import { SanityService } from '../../service/sanity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  about_details: any = [];

  constructor( private sanityService: SanityService ) { }

  ngOnInit() {
    this.getAbout();
  }

  async getAbout() {
    let data = await this.sanityService.getAbout();
    this.about_details = data[0]

    // console.log(this.about_details)  

    this.about_details.thumbImageUrl = this.getImageUrl(this.about_details.mainImage.asset);
    this.about_details.backgroundImageUrl = this.getImageUrl(this.about_details.backgroundImage.asset);
    
  }

  private getImageUrl(source: any) {
    return this.sanityService.urlForImage(source)
  }

}
