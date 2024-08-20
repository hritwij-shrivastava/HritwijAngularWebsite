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

  async getResume() {
    return await this.sanityClientCredentials.fetch(
      `*[_type == "about"]{resume}`
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
  
}

