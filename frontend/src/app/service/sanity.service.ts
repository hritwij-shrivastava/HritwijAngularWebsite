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
  
  
}

