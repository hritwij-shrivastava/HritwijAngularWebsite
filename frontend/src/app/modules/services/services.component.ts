import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { LightboxConfig } from 'ngx-lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SanityService } from '../../service/sanity.service';

const myAlbum = ["/public/static/asset/cert/img1656753781152.jpg",
            "/public/static/asset/cert/img1656828250156.jpg",
            "/public/static/asset/cert/img1657108852209.jpg",
            "/public/static/asset/cert/img1657108852210.jpg",
            "/public/static/asset/cert/img1657369948881.jpg",
            "/public/static/asset/cert/img1656517583040.jpg",
            "/public/static/asset/cert/img1656555833068.jpg",
            "/public/static/asset/cert/img1657129178820.jpg",
            "/public/static/asset/cert/img1657379007024.jpg",
            "/public/static/asset/cert/img1657230101649.jpg",
             "/public/static/asset/cert/img1656588803302.jpg",
             "/public/static/asset/cert/img1656970909290.jpg",
             "/public/static/asset/cert/img1657336515223.jpg"
          ]

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  encapsulation: ViewEncapsulation.None, // This makes styles global
})
export class ServicesComponent implements OnInit {
  _albums: any = [];
  recent_posts!: any;
  currentDate: string = '';
  section: string = "blog";
  services: any = [];
  certificates: any = [];
  resumeUrl!: string;

  caseStudiesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 400,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right">'],
    autoWidth: true,
    stagePadding: 200, 
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
        loop: true
      }
    },
    nav: true
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
  
  constructor(private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox, private sanityService: SanityService) {
    _lightboxConfig.fitImageInViewPort = true;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.showZoom = true;
  }

  ngOnInit(): void {
    this.getServices();
    this.getCertificates();
    this.getResume();
    this.currentDate = this.getCurrentDate();
    this.getRecentPosts();
  }

  async getServices() {
    this.services = await this.sanityService.getServices();

    for(let i=0; i<this.services.length; i++){
      this.services[i].mainImageUrl = this.getImageUrl(this.services[i].mainImage.asset)
    }

    this.services = this.services.sort((a:any, b:any) => parseInt(a.slno) - parseInt(b.slno));
  }

  async getCertificates() {
    this.certificates = await this.sanityService.getCertificates();

    for(let i=0; i<this.certificates.length; i++){
      this.certificates[i].bannerImageUrl = this.getImageUrl(this.certificates[i].bannerImage.asset)
    }

    this.createLightBoxArray()
  }

  async getResume() {
    let data = await this.sanityService.getResume();
    let asset = {
      assetId: data[0].resume.asset._ref.split("-")[1],
      extension: 'pdf',
      vanityFilename: ''
    }

    this.resumeUrl = this.getFileUrl(asset);
  }

  private getCurrentDate(): string {
    const now = new Date();
    return now.toISOString();
  }

  private getImageUrl(source: any) {
    return this.sanityService.urlForImage(source)
  }

  private getFileUrl(source: any) {
    return this.sanityService.urlForFile(source)
  }

  private createLightBoxArray(){
    for (let i=0; i<this.certificates.length; i++) {
      const src = this.certificates[i].bannerImageUrl;
      const caption = this.certificates[i].title;
      const thumb = this.certificates[i].bannerImageUrl;
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };
      this._albums.push(album);
    }
  }

  convertString2Date(value: string) {
    return new Date(value);
  }

  async getAuthorDetails(authorId: string) {
    let author_name = await this.sanityService.getAuthorDetails(authorId)
    return author_name[0].name
  }

  async getCategoryDetails(categoryId: string) {
    let category_name = await this.sanityService.getCategoryDetails(categoryId)
    return category_name[0].title
  }

  async getRecentPosts() {
    this.recent_posts = await this.sanityService.getRecentPosts(this.section, this.currentDate, 0, 3)

    for(let i=0; i<this.recent_posts.length; i++){
      this.recent_posts[i].thumbImageUrl = this.getImageUrl(this.recent_posts[i].mainImage.asset);
      this.recent_posts[i].publishedTime = this.convertString2Date(this.recent_posts[i].publishedAt);
      this.recent_posts[i].author_name = await this.getAuthorDetails(this.recent_posts[i].author._ref);
      this.recent_posts[i].category_name = await this.getCategoryDetails(this.recent_posts[i].category._ref);
    }

    // console.log( this.recent_posts)
  }

  open(index: number): void {
    console.log("working")
    console.log(this._albums[index])
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
