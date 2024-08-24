import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SanityService } from '../../service/sanity.service';

@Component({
  selector: 'app-tutorial-single',
  templateUrl: './tutorial-single.component.html',
  styleUrl: './tutorial-single.component.css',
  encapsulation: ViewEncapsulation.None // This will disable view encapsulation
})
export class TutorialSingleComponent implements OnInit {
  @ViewChild('resizableDiv', { static: true }) resizableDiv!: ElementRef;
  @ViewChild('resizer', { static: true }) resizer!: ElementRef;

  private isResizing = false;

  isLoading: boolean = true;
  section: string = "topic";
  category!: string;
  tutorialSlug!: string;
  topicSlug!: string;
  mainTopic!: string;
  subTopic!: string;
  tutorialList: any = [];
  topicList: any = [];
  headingList: any = [];
  slugList: any = [];
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
  showSidebar:Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private sanityService: SanityService, 
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.listen(this.resizer.nativeElement, 'mousedown', this.onMouseDown.bind(this));
    this.currentDate = this.getCurrentDate();
    this.route.paramMap.subscribe(params => {
      this.tutorialSlug = params.get('tutorialSlug') ?? '';
      this.topicSlug = params.get('topicSlug') ?? '';
    });
    this.getSideBarDetails();
    this.getRecentPosts();
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
    let tags = this.topicList[0].tags
    if(tags){
      for(let i=0; i<tags.length; i++){
        if(tags[i]._ref){
          let tag_data = await this.sanityService.getTagsDetails(tags[i]._ref)
          this.tags_list[i] = tag_data[0].title
        }
      }
    }
  }

  // Helper function to extract HTML from body array
  private getHtmlContent(bodyArray: any[]): string {
    return bodyArray.map(block => block.children.map((child: { text: any; }) => child.text).join('')).join('');
  }

  private sanitizeBody() {
    if (this.topicList[0] && this.topicList[0].body && this.topicList[0].body.length > 0) {
      // Sanitize and assign HTML content
      this.bodyContent = this.sanitizer.bypassSecurityTrustHtml(this.getHtmlContent(this.topicList[0].body));
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






  async getTopicTitleSlugAndSubtopic(topicId:string) {
    let topic_detail = await this.sanityService.getTopicDetails(topicId)
    return [topic_detail[0].title, topic_detail[0].slug.current, topic_detail[0].subtopic]
  }


  async getSideBarDetails(){
    this.tutorialList = await this.sanityService.getBlogListDetails("tutorial", this.tutorialSlug);   // Fetch details about tutorial
    this.headingList = this.tutorialList[0].topics

    for(let i=0; i<this.headingList.length; i++){                                                    // Get Details of Heading
      this.headingList[i].subHeadingList = []
      let subHeadingList = this.headingList[i].topics

      for(let j=0; j<subHeadingList.length; j++){                                                         // For Each Heading get all sub headings
        let title_details:any =  await this.getTopicTitleSlugAndSubtopic(subHeadingList[j]._ref)
        let title = title_details[0]
        let slug = title_details[1]
        let subTopic = title_details[2]

        let isopenSubTopic = false

        this.slugList.push({"title": title, "slug": slug})

        let subTopicList = []

        if(subTopic){

          for(let k=0; k<subTopic.length; k++){                                                           // Now sometimes sub headings will contain sub topics so get details of that
            let sub_title_details:any =  await this.getTopicTitleSlugAndSubtopic(subTopic[k]._ref)
            let sub_title_title = sub_title_details[0]
            let sub_title_slug = sub_title_details[1]

            this.slugList.push({"title": sub_title_title, "slug": sub_title_slug})
  
            subTopicList.push({"title": sub_title_title, "slug": sub_title_slug})

            if(this.topicSlug === sub_title_slug){
              isopenSubTopic = true;
            }
  
          }
        }
        this.headingList[i].subHeadingList.push({"title": title, "slug": slug,"subTopicList": subTopicList, "isopenSubTopic": isopenSubTopic})
      }
    }
    this.updateActiveStates();
  }

  async getTopicDetails() {
    this.topicList = await this.sanityService.getBlogListDetails(this.section, this.topicSlug);
    this.title = this.topicList[0].title;
    if(this.topicList[0].author){
      this.author_name = await this.getAuthorDetails(this.topicList[0].author._ref);
    }
    if(this.topicList[0].category){ 
      this.category_name = await this.getCategoryDetails(this.topicList[0].category._ref);
    }
    this.sanitizeBody();
    if(this.topicList[0].mainImage){
      this.thumbImageUrl = this.getImageUrl(this.topicList[0].mainImage.asset);
    }
    if(this.topicList[0].bannerImage){
      this.bannerImageUrl = this.getImageUrl(this.topicList[0].bannerImage.asset);
    }
    this.publishedAt = this.convertString2Date(this.topicList[0].publishedAt)

    if(this.topicList[0].cssFile){
      let asset = {
        assetId: this.topicList[0].cssFile.asset._ref.split("-")[1],
        extension: 'css',
        vanityFilename: ''
      }
      this.getFileUrl(asset);
      this.loadCssFile(this.cssFileUrl)
    }
    this.getTagsDetails()
  }

  
  async getAdjacentTopic() {
    let index = this.slugList.findIndex((item:any) => item.slug === this.topicSlug);
    let previousPost = {"title": "", "slug":""};
    let nextPost = {"title": "", "slug":""};

    if((index === 0) && (index === this.slugList.length -1)){   //when there is only one blog
      previousPost = {"title": "", "slug":""};
      nextPost = {"title": "", "slug":""};
    }
    else {                                                      //when there are more than one blog
      if((index === 0) && (index != this.slugList.length -1)){    //when blog is at first index
        previousPost = {"title": "", "slug":""};
        nextPost = {"title":  this.slugList[index+1].title, "slug":this.slugList[index+1].slug};
      }
      if((index > 0) && (index != this.slugList.length -1)){    //when blog is not at first index
        previousPost = {"title":  this.slugList[index-1].title, "slug":this.slugList[index-1].slug};
        nextPost = {"title":  this.slugList[index+1].title, "slug":this.slugList[index+1].slug};
      }
      if(index === this.slugList.length -1){    //when blog is not at first index
        previousPost = {"title":  this.slugList[index-1].title, "slug":this.slugList[index-1].slug};
        nextPost = {"title": "", "slug":""};
      }
    }

    this.adjacent_post = {previousPost,nextPost}
  }

  async updateActiveStates() {
    await this.getTopicDetails();
    await this.getAdjacentTopic();
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

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();

    const screenWidth = window.innerWidth;

    if(screenWidth > 1200){
      this.isResizing = true;
  
      const mouseMoveHandler = this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
      const mouseUpHandler = this.renderer.listen('document', 'mouseup', () => {
        this.onMouseUp();
        mouseMoveHandler();  // Remove mousemove listener
        mouseUpHandler();    // Remove mouseup listener
      });
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      const newWidth = event.pageX - this.resizableDiv.nativeElement.getBoundingClientRect().left;
      this.resizableDiv.nativeElement.style.width = `${newWidth}px`;
    }
  }

  onMouseUp(): void {
    this.isResizing = false;
  }

  toggleSubMenu(i:number,j:number){

    this.headingList[i].subHeadingList[j].isopenSubTopic = !this.headingList[i].subHeadingList[j].isopenSubTopic
  }

  navigate(topicSlug:string){
    let dest = 'tutorial/' + this.tutorialSlug + '/' + topicSlug
    this.router.navigate([dest]);
    this.topicSlug = topicSlug
    this.isLoading = true;
    this.updateActiveStates()
  }

  expandSidebar() {
    this.showSidebar = !this.showSidebar
  }

}
