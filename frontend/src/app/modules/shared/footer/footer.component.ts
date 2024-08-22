import { Component, OnInit } from '@angular/core';
import { SanityService } from '../../../service/sanity.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit  {
  socialMedia_list: any = [];
  linkedinUrl: string = '';
  twitterUrl: string = '';
  instagramUrl: string = '';
  facebookUrl: string = '';
  youtubeUrl: string = '';
  githubUrl: string = '';
  kaggleUrl: string = '';
  email: string = "";
  phone: string = "";
  address: string = "";

  constructor(private sanityService: SanityService) {}

  ngOnInit(): void {
    this.getEmail();
    this.getPhone();
    this.getAddress();
    this.getSocialMedia();
  }

  async getEmail() {
    let data = await this.sanityService.getEmail();
    this.email = data[0].email
  }

  async getPhone() {
    let data = await this.sanityService.getPhone();
    this.phone = data[0].phone
  }

  async getAddress() {
    let data = await this.sanityService.getAddress();
    this.address = data[0].address
  }
  
  async getSocialMedia() {
    this.socialMedia_list = await this.sanityService.getSocialMedia()
    for(let i=0; i<this.socialMedia_list.length; i++){
      let title = this.socialMedia_list[i]["title"]
      if(title=="linkedin"){
        this.linkedinUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="twitter"){
        this.twitterUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="instagram"){
        this.instagramUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="facebook"){
        this.facebookUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="youtube"){
        this.youtubeUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="github"){
        this.githubUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="kaggle"){
        this.kaggleUrl = this.socialMedia_list[i]["url"]
      }
    }
  }
}
