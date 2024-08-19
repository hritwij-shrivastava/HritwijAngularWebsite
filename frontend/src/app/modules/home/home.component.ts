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
    this.about_details = await this.sanityService.getAbout();

    console.log(this.about_details)

  
    this.about_details[0].thumbImageUrl = this.getImageUrl(this.about_details[0].mainImage.asset);

  }

  private getImageUrl(source: any) {
    return this.sanityService.urlForImage(source)
  }

  // private getFileUrl(source: any) {
  //   this.cssFileUrl = this.sanityService.urlForFile(source)
  // }
}
