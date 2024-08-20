import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalComponent } from './modal/modal.component';
import { SanityService } from '../../service/sanity.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  @ViewChild('modal') modal!: ModalComponent;

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
  expertise: any = [];

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
  
  constructor( private sanityService: SanityService, private sanitizer: DomSanitizer, ) { }

  ngOnInit(): void {
    this.showAbout = true;
    this.showEdu = true;
    this.getAbout();
    this.getEducation();
    this.getExperience();
    this.getExpertise();
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

  async getExpertise() {
    this.expertise = await this.sanityService.getExpertise();

    for(let i=0; i<this.expertise.length; i++){
      this.expertise[i].bannerImageurl = this.getImageUrl(this.expertise[i].bannerImage.asset)
    }
  }

  async getExperience() {
    this.experience = await this.sanityService.getExperience();

    for(let i=0; i<this.experience.length; i++){
      this.experience[i].slno = parseInt(this.experience[i].slno);
      this.experience[i].isOdd = this.isOdd(this.experience[i].slno);
    }

    this.experience = this.experience.sort((a:any, b:any) => parseInt(a.slno) - parseInt(b.slno));
  }


  private getImageUrl(source: any) {
    return this.sanityService.urlForImage(source)
  }

  private getFileUrl(source: any) {
    return this.sanityService.urlForFile(source)
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

  playVideo(videoId: string) {
    this.modal.openModal(videoId);
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

}
