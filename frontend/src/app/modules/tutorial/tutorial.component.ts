import { Component, OnInit } from '@angular/core';
import { SanityService } from '../../service/sanity.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.css'
})
export class TutorialComponent implements OnInit {

  constructor(private sanityService: SanityService ) { }

  tutorialsList: any = [];
  section: string = "tutorial";
  totalTutorialCount: number = 0;
  currentPageNo: number = 1;
  numberOfItemsPerPage: number = 10;
  start: number = 0;
  end: number = this.start + this.numberOfItemsPerPage;
  pageRange: number = 1;
  isLoading: boolean = true;
  
  ngOnInit(): void {
    this.getTutorialsList();
  }

  async getCountOfTutorials(){
    this.totalTutorialCount = await this.sanityService.getCountsOfBlogs(this.section);
    this.pageRange = Math.ceil(this.totalTutorialCount / this.numberOfItemsPerPage)
  }

  convertString2Date(value: string): Date {
    return new Date(value);
  }


  async getTopicSlug(topicId:string) {
    let slug = await this.sanityService.getTopicSlug(topicId)
    return slug[0].slug.current
  }

  async getTutorialsList()  {
    this.getCountOfTutorials();
    this.tutorialsList = await this.sanityService.getBlogsList(this.section, this.start, this.end);
    for(let i=0; i<this.tutorialsList.length; i++){ 
      this.tutorialsList[i].tutorialSlug = this.tutorialsList[i].slug.current
      
      if(this.tutorialsList[i].topics){
        let firstMainTopic = this.tutorialsList[i].topics[0].topics[0]
        let slug = await this.getTopicSlug(firstMainTopic._ref);
        this.tutorialsList[i].firstTopicSlug = slug
      }
      
    }
    this.getThumbImageUrl();
    this.isLoading = false;
  } 

  getThumbImageUrl() {
    for(let i=0; i<this.tutorialsList.length; i++){
      this.tutorialsList[i].thumbImageUrl = this.sanityService.urlForImage(this.tutorialsList[i].bannerImage.asset)
    }
  }

  updateStartEnd(pageNo:number){
    if(pageNo <= 1){
      this.currentPageNo = 1
    }
    else{
      if(pageNo >= this.pageRange){
        this.currentPageNo = this.pageRange
      }
      else{
        this.currentPageNo = pageNo
      }
    }
    this.start = (this.currentPageNo-1) * this.numberOfItemsPerPage
    this.end = this.start + this.numberOfItemsPerPage
  }
  
  truncateTitle(title:string, maxLength:number){
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
  }
}
