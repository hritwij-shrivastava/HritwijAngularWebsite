import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SanityService } from '../../service/sanity.service';
import { VideoModalComponent } from './video-modal/video-modal.component';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  encapsulation: ViewEncapsulation.None, // This makes styles global
})
export class ServicesComponent implements OnInit {

  @ViewChild('videoModal') videoModal!: VideoModalComponent;
  
  expertise: any = [];
  video:string = ''
  serviceBlogsList: any = [];
  phone: string = "";
  section: string = "serviceBlog";
  numberOfItemsPerPage: number = 10;
  start: number = 0;
  end: number = this.start + this.numberOfItemsPerPage;
  
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
  
  blogOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: false,
    autoplaySpeed: 50,
    navText: ['', ''],
    autoWidth: true,
    stagePadding: 100, 
    rtl: false,
    margin: 30,
    responsive: {
      0: {
        items: 1,
        loop: true
      },
      400: {
        items: 1,
        loop: true
      },
      740: {
        items: 2,
        loop: true
      },
      940: {
        items: 3,
        loop: false
      }
    },
    nav: true
  }

  constructor(private sanityService: SanityService) {}

  ngOnInit(): void {
    this.getVideo();
    this.getPhone();
    this.getExpertise();
    this.getBlogsList();
  }

  async getBlogsList()  {
    this.serviceBlogsList = await this.sanityService.getBlogsList(this.section, this.start, this.end);
    this.getThumbImageUrl();
  } 

  getThumbImageUrl() {
    for(let i=0; i<this.serviceBlogsList.length; i++){
      this.serviceBlogsList[i].thumbImageUrl = this.sanityService.urlForImage(this.serviceBlogsList[i].bannerImage.asset)
    }
  }

  async getPhone() {
    let data = await this.sanityService.getPhone();
    this.phone = data[0].phone
  }
  
  truncateTitle(title:string, maxLength:number){
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
  }

  private getImageUrl(source: any) {
    return this.sanityService.urlForImage(source)
  }

  async getExpertise() {
    this.expertise = await this.sanityService.getExpertise();

    for(let i=0; i<this.expertise.length; i++){
      this.expertise[i].bannerImageurl = this.getImageUrl(this.expertise[i].bannerImage.asset)
    }
  }  
  
  async getVideo() {
    let data = await this.sanityService.getVideo();
    this.video = data[0].video
  }

  playVideo(videoId: string) {
    this.videoModal.openModal(videoId);
  }

}
