import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SanityService } from '../../service/sanity.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Lightbox } from 'ngx-lightbox';
import { LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  section: string = "blog";
  showAbout: Boolean = false;
  showSkill: Boolean = false;
  showContact: Boolean = false;
  showEdu: Boolean = false;
  showExp: Boolean = false;
  about_details: any = [];
  video_thumb!: string;
  resumeUrl!: string;
  education: any = [];
  experience: any = [];
  _albums: any = [];
  certificates: any = [];
  recent_posts!: any;
  currentDate: string = '';
  services: any = [];
  skills: any = [];
  thumbs_list: any = ["assets/img/software/2.png", "assets/img/software/3.png", "assets/img/software/4.png", "assets/img/software/5.png", "assets/img/software/6.png", "assets/img/software/8.png", "assets/img/software/9.png", "assets/img/software/10.png"];

  certificateOptions: OwlOptions = {
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

  thumbOptions: OwlOptions = {
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
        items: 1,
        loop: true
      },
      400: {
        items: 1,
        loop: true
      },
      740: {
        items: 1,
        loop: true
      },
      940: {
        items: 1,
        loop: true
      }
    },
    nav: false
  }
  
  constructor(private _lightboxConfig: LightboxConfig, private _lightbox: Lightbox, private sanityService: SanityService, private sanitizer: DomSanitizer) {
    _lightboxConfig.fitImageInViewPort = true;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.showZoom = true;
  }


  ngOnInit(): void {
    this.showAbout = true;
    this.showEdu = true;
    this.currentDate = this.getCurrentDate();
    this.getAbout();
    this.getEducation();
    this.getExperience();
    this.getCertificates();
    this.getServices();
    this.getResume();
    this.getRecentPosts();
    this.getSkills();
  }

  async getAbout() {
    let data = await this.sanityService.getAbout();
    this.about_details = data[0]

    this.about_details.aboutImageUrl = this.getImageUrl(this.about_details.aboutImage.asset);
    this.about_details.dob = this.calculateAge(this.about_details.dob)

    let asset = {
      assetId: this.about_details.resume.asset._ref.split("-")[1],
      extension: 'pdf',
      vanityFilename: ''
    }

    this.resumeUrl = this.getFileUrl(asset);
    this.video_thumb = this.getImageUrl(this.about_details.videoThumb.asset)
  }
  
  async getServices() {
    this.services = await this.sanityService.getServices();

    for(let i=0; i<this.services.length; i++){
      this.services[i].mainImageUrl = this.getImageUrl(this.services[i].mainImage.asset)
    }

    this.services = this.services.sort((a:any, b:any) => parseInt(a.slno) - parseInt(b.slno));
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

  async getCertificates() {
    this.certificates = await this.sanityService.getCertificates();

    for(let i=0; i<this.certificates.length; i++){
      this.certificates[i].bannerImageUrl = this.getImageUrl(this.certificates[i].bannerImage.asset)
    }

    this.createLightBoxArray()
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

  // Helper function to extract HTML from body array
  private getHtmlContent(bodyArray: any[]): string {
    return bodyArray.map(block => block.children.map((child: { text: any; }) => child.text).join('')).join('');
  }

  async getEducation() {
    this.education = await this.sanityService.getEducation();

    for(let i=0; i<this.education.length; i++){
      this.education[i].slno = parseInt(this.education[i].slno);
      this.education[i].isOdd = this.isOdd(this.education[i].slno);
      this.education[i].courseTitle = this.sanitizer.bypassSecurityTrustHtml(this.getHtmlContent(this.education[i].courseTitle));
    }

    this.education = this.education.sort((a:any, b:any) => parseInt(a.slno) - parseInt(b.slno));
  }

  async getExperience() {
    this.experience = await this.sanityService.getExperience();

    for(let i=0; i<this.experience.length; i++){
      this.experience[i].slno = parseInt(this.experience[i].slno);
      this.experience[i].isOdd = this.isOdd(this.experience[i].slno);
    }

    this.experience = this.experience.sort((a:any, b:any) => parseInt(a.slno) - parseInt(b.slno));
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

  }

  async getSkills() {
    this.skills = await this.sanityService.getSkills();
  }

  isOdd(num:any){ 
    return parseInt(num) % 2;
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

  calculateAge(dob: Date | string): number {
    const birthDate = typeof dob === 'string' ? new Date(dob) : dob;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    // Adjust age if birth month has not occurred yet in the current year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
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
