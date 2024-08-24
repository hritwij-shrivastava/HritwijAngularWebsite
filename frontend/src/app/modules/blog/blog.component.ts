import { Component, OnInit } from '@angular/core';
import { SanityService } from '../../service/sanity.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  constructor(private sanityService: SanityService ) { }

  blogsList: any = [];
  section: string = "blog";
  totalBlogCount: number = 0;
  currentPageNo: number = 1;
  numberOfItemsPerPage: number = 10;
  start: number = 0;
  end: number = this.start + this.numberOfItemsPerPage;
  pageRange: number = 1;
  isLoading: boolean = true;
  
  ngOnInit(): void {
    this.getBlogsList();
  }

  async getCountOfBlogs(){
    this.totalBlogCount = await this.sanityService.getCountsOfBlogs(this.section);
    this.pageRange = Math.ceil(this.totalBlogCount / this.numberOfItemsPerPage)
  }

  convertString2Date(value: string): Date {
    return new Date(value);
  }

  async getBlogsList()  {
    this.getCountOfBlogs();
    this.blogsList = await this.sanityService.getBlogsList(this.section, this.start, this.end);
    this.getAuthorDetails();
    this.getCategoryDetails();
    this.updatePublishedAt();
    this.getThumbImageUrl();
    this.isLoading = false;
  } 

  async getAuthorDetails(){

    for(let i=0; i<this.blogsList.length; i++){
      let authorId = this.blogsList[i].author._ref
      let author_name = await this.sanityService.getAuthorDetails(authorId)
      author_name = author_name[0].name
      this.blogsList[i]["author_name"] = author_name

    }
  }

  async getCategoryDetails(){

    for(let i=0; i<this.blogsList.length; i++){
      let categoryId = this.blogsList[i].category._ref
      let category_name = await this.sanityService.getCategoryDetails(categoryId)
      category_name = category_name[0].title
      this.blogsList[i]["category_name"] = category_name

    }
  }

  async updatePublishedAt(){

    for(let i=0; i<this.blogsList.length; i++){
      this.blogsList[i].publishedAt = this.convertString2Date(this.blogsList[i].publishedAt)
    }
  }

  getThumbImageUrl() {
    for(let i=0; i<this.blogsList.length; i++){
      this.blogsList[i].thumbImageUrl = this.sanityService.urlForImage(this.blogsList[i].bannerImage.asset)
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
