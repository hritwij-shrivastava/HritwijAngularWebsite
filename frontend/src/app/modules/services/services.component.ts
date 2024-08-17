import { Component, ViewEncapsulation } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
export class ServicesComponent {
  _albums: any = [];
  recent_posts: any = [{"0":"abc"}];
  section: string = "explore";

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
    autoplay: true,
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
  
  constructor(private _lightbox: Lightbox) {
    for (let i = 1; i <= 4; i++) {
      const src = 'assets/img/hrlaptop.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'assets/img/hrlaptop.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._albums.push(album);
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
