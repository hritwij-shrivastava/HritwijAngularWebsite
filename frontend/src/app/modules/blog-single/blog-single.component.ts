import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SanityService } from '../../service/sanity.service';


@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrl: './blog-single.component.css',
  encapsulation: ViewEncapsulation.None // This will disable view encapsulation
})
export class BlogSingleComponent implements OnInit {

  isLoading: boolean = true;
  section!: string;
  category!: string;
  slug!: string;
  blogList: any = [];
  thumbImageUrl!: string;
  category_name!: string;
  publishedAt!: Date;
  author_name!: string;
  title!: string;
  bodyContent: SafeHtml = '';
  cssFileUrl!: string;
  bannerImageUrl!: string;
  tags_list: any = [];
  top_tags_list: any = [];
  adjacent_post: any = [];
  recent_posts: any = [];
  currentDate: string = '';
  top_categories_list: any = [];
  socialMedia_list: any = [];

  constructor(
    private route: ActivatedRoute, 
    private sanityService: SanityService, 
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.currentDate = this.getCurrentDate();
    this.route.paramMap.subscribe(params => {
      this.section = params.get('section') ?? '';
      this.category = params.get('category') ?? '';
      this.slug = params.get('slug') ?? '';
    });
    this.updateActiveStates();
    this.getToptagList();
    this.getTopCategoryList();
    this.getSocialMedia();
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toISOString();
  }

  async getAuthorDetails(authorId:string) {
    let author_name = await this.sanityService.getAuthorDetails(authorId)
    return author_name[0].name
  }

  async getCategoryDetails(categoryId:string) {
    let category_name = await this.sanityService.getCategoryDetails(categoryId)
    return category_name[0].title
  }

  async getTagsDetails() {
    let tags = this.blogList[0].tags
    for(let i=0; i<tags.length; i++){
      if(tags[i]._ref){
        let tag_data = await this.sanityService.getTagsDetails(tags[i]._ref)
        this.tags_list[i] = tag_data[0].title
      }
    }
  }

  // Helper function to extract HTML from body array
  private getHtmlContent(bodyArray: any[]): string {
    return bodyArray.map(block => block.children.map((child: { text: any; }) => child.text).join('')).join('');
  }

  private sanitizeBody() {
    if (this.blogList[0] && this.blogList[0].body && this.blogList[0].body.length > 0) {
      // Sanitize and assign HTML content
      this.bodyContent = this.sanitizer.bypassSecurityTrustHtml(this.getHtmlContent(this.blogList[0].body));
    }
  }

  private getFileUrl(source: any) {
    this.cssFileUrl = this.sanityService.urlForFile(source)
  }

  private loadCssFile(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const linkElement = this.document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = url;
      this.document.head.appendChild(linkElement);
    }
    if (isPlatformServer(this.platformId)) {
      const linkElement = this.document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = url;
      this.document.head.appendChild(linkElement);
    }
  }

  getImageUrl(source: any) {
    return this.sanityService.urlForImage(source)
  }

  convertString2Date(value: string) {
    return new Date(value);
  }

  async getblogListDetails() {
    this.blogList = await this.sanityService.getBlogListDetails(this.section, this.slug);
    this.title = this.blogList[0].title;
    this.author_name = await this.getAuthorDetails(this.blogList[0].author._ref);
    this.category_name = await this.getCategoryDetails(this.blogList[0].category._ref);
    this.sanitizeBody();
    if(this.blogList[0].mainImage){
      this.thumbImageUrl = this.getImageUrl(this.blogList[0].mainImage.asset);
    }
    if(this.blogList[0].bannerImage){
      this.bannerImageUrl = this.getImageUrl(this.blogList[0].bannerImage.asset);
    }
    this.publishedAt = this.convertString2Date(this.blogList[0].publishedAt)

    let asset = {
      assetId: this.blogList[0].cssFile.asset._ref.split("-")[1],
      extension: 'css',
      vanityFilename: ''
    }
    this.getFileUrl(asset);
    this.loadCssFile(this.cssFileUrl)
    this.getTagsDetails()
  }

  async updateActiveStates() {
    await this.getblogListDetails();
    await this.getAdjacentPosts();
    await this.getRecentPosts();
    this.isLoading = false;
  }

  async getToptagList() {
    this.top_tags_list = await this.sanityService.getTopTags(0, 7)
  }

  async getTopCategoryList() {
    let category_list = await this.sanityService.getTopCategories(0, 5)
    for(let i=0; i<category_list.length; i++){
      this.top_categories_list[i] = {
                                      "title":category_list[i].title ,
                                      "count": await this.sanityService.countDocumentsByCategory(category_list[i]._id)
                                    }
    }
  }

  async getAdjacentPosts() {
    this.adjacent_post = await this.sanityService.getAdjacentPosts(this.section, this.blogList[0]._createdAt)
    if(this.adjacent_post.previousPost){
      this.adjacent_post.previousPost.category_name = await this.getCategoryDetails(this.adjacent_post.previousPost.category._ref);
    }
    if(this.adjacent_post.nextPost){
      this.adjacent_post.nextPost.category_name = await this.getCategoryDetails(this.adjacent_post.nextPost.category._ref);
    }
  }

  async getRecentPosts() {
    this.recent_posts = await this.sanityService.getRecentPosts(this.section, this.currentDate, 0, 3)

    for(let i=0; i<this.recent_posts.length; i++){
      if(this.recent_posts[i].mainImage){
        this.recent_posts[i].thumbImageUrl = this.getImageUrl(this.recent_posts[i].mainImage.asset);
      }
      if(this.recent_posts[i].publishedAt){
        this.recent_posts[i].publishedTime = this.convertString2Date(this.recent_posts[i].publishedAt)
      }
    }
  }

  async getSocialMedia() {
    this.socialMedia_list = await this.sanityService.getSocialMedia()
  }


  truncateTitle(title:string, maxLength:number){
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
  }

}
