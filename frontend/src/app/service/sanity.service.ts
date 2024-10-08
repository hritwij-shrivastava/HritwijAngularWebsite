import { Injectable } from '@angular/core';
import {createClient} from '@sanity/client'
import imageUrlBuilder from "@sanity/image-url";
import {buildFileUrl} from '@sanity/asset-utils'


@Injectable({
  providedIn: 'root'
})
export class SanityService {
  constructor() { }
  
  sanityClientCredentials = createClient({
    projectId: 'ndddd9bs',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  })

  option = {
    projectId: 'ndddd9bs',
    dataset: 'production'
  }

  urlForImage = (source: any) =>imageUrlBuilder(this.sanityClientCredentials).image(source).url();
  urlForFile = (source: any) =>buildFileUrl(source, this.option);

  async getAbout(){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "about"]`
    );
  }

  async getEducation(){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "education"]`
    );
  }

  async getExperience(){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "experience"]`
    );
  }

  async getExpertise(){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "expertise"]`
    );
  }
  
  async getServices(){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "services"]`
    );
  }

  async getCertificates(){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "certificate"]`
    );
  }

  async getSkills(){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "skills"]`
    );
  }

  async getResume() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "about"]{resume}`
    );
  }

  async getAddress() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "about"]{address}`
    );
  }

  async getEmail() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "about"]{email}`
    );
  }

  async getPhone() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "about"]{phone}`
    );
  }

  async getVideo() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "about"]{video}`
    );
  }

  async getAuthorDetails(authorId:any){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "author" && _id == $authorId]`, { authorId }
    );
  }

  async getTagsDetails(tagId:any) {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "tags" && _id == $tagId]`, { tagId }
    );
  }

  async getCategoryDetails(categoryId:any){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "category" && _id == $categoryId]`, { categoryId }
    );
  }

  async getBlogsList(section:string, start:number, end:number){
    return await this.sanityClientCredentials.fetch(
      `*[_type == $section][$start...$end]`, {section, start, end}
    );
  }

  async getCountsOfBlogs(section:string){
    return await this.sanityClientCredentials.fetch(
      `count(*[_type == $section])`, {section}
    );
  }

  async getRecentPosts(section:string, currentDate:string, start:number, end:number){
    const query = `*[_type == $section && _createdAt < $currentDate] | order(_createdAt desc)[$start...$end]`
    const params = { section, currentDate, start, end }
    return await this.sanityClientCredentials.fetch(query, params)
  }

  // Blog Details Related Services
  async getBlogListDetails(section:string, slug:string){
    return await this.sanityClientCredentials.fetch(
      `*[_type == $section && slug.current == $slug]`, { section, slug }
    );
  }

  async getTopTags(start:number, end:number){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "tags"][$start..$end]`, {start, end}
    );
  }

  async getTopCategories(start:number, end:number){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "category"][$start..$end]`, {start, end}
    );
  }

  async countDocumentsByCategory(categoryId: string) {
    const types = ["pressReleases"]; // List all document types you want to query
  
    const counts = await Promise.all(
      types.map(async type => {
        return {
          type,
          count: await this.sanityClientCredentials.fetch(
            `count(*[_type == $type && category._ref == $categoryId])`,
            { type, categoryId }
          )
        };
      })
    );
  
    return counts.reduce((acc, { count }) => acc + count, 0); // Sum the counts of all types
  }

  async getAdjacentPosts(section:string, currentPostDate:string){
    const query = `
    {
      "previousPost": *[_type == $section && _createdAt < $currentPostDate] | order(_createdAt desc)[0],
      "nextPost": *[_type == $section && _createdAt > $currentPostDate] | order(_createdAt asc)[0]
    }
    `
    const params = { section, currentPostDate }
    return await this.sanityClientCredentials.fetch(query, params)
  }

  async getSocialMedia(){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "social"]`
    );
  }

  // Tutorial Related Services Start =========================

  async getTopicDetails(topicId:any){
    return await this.sanityClientCredentials.fetch(
      `*[_type == "topic" && _id == $topicId]`, { topicId }
    );
  }

  async getTopicSlug(topicId:any) {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "topic" && _id == $topicId]{slug}`, { topicId }
    );
  }
  
}

