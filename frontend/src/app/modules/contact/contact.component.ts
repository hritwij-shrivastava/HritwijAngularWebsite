import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import { GoogleService } from '../../service/google.service';
import { JsonDataService } from '../../service/json-data.service';
import { SanityService } from '../../service/sanity.service';
import Swal, { SweetAlertOptions }  from 'sweetalert2';

export interface Country {
  code: string;
  name: string;
}

export interface CountryData {
  countries: Country[];
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: NgModel;
  @ViewChild('code') code!: ElementRef;
  @ViewChild('phone') phone!: NgModel;
  @ViewChild('comments') comments!: ElementRef;

  myControl = new FormControl('');
  filteredOptions!: Observable<CountryData>;
  countryCode: CountryData = { countries: [] };
  isSpinner: Boolean = false;
  about_details: any = [];
  socialMedia_list: any = [];
  linkedinUrl: string = '';
  twitterUrl: string = '';
  instagramUrl: string = '';
  facebookUrl: string = '';
  youtubeUrl: string = '';
  githubUrl: string = '';
  kaggleUrl: string = '';
  isSocialMedia:Boolean = false;
  alertMessage: SweetAlertOptions = {
    icon: 'warning',
    title: 'Oops!',
    text: 'Please Fill the form Correctly',
    confirmButtonText: 'OK'
  };  
  
  constructor(private sanityService: SanityService, private googleService: GoogleService, private jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.getCountryCode();
    this.getAbout();
    this.getSocialMedia();
  }

  async getAbout() {
    let data = await this.sanityService.getAbout();
    this.about_details = data[0]
  }

  onButtonClick(event: Event, name:string, email:string, code:string, phone:string, comments:string) {
    event.preventDefault();

    if (!(name == '' || email == '' || code == ''|| phone == ''|| comments == '')){

      const requestData = {
        name: name,
        email: email,
        phone: code + " " + phone,
        comments: comments,
        category: "Contact"
      };
      
      this.isSpinner = true;
      
      this.googleService.sendPostRequest(requestData).subscribe({
        next: (response) => {
          this.isSpinner = false;
          this.alertMessage = {
            icon: 'success',
            title: 'Success!',
            text: 'We will reach you back soon.',
            confirmButtonText: 'OK'
          };

          Swal.fire(this.alertMessage);
          this.name.nativeElement.value = '';
          this.email.control.setValue(''); // Clear the value
          this.email.control.markAsPristine(); // Optionally mark as pristine
          this.email.control.markAsUntouched(); // Optionally mark as untouched
          this.code.nativeElement.value = '';
          this.phone.control.setValue(''); // Clear the value
          this.phone.control.markAsPristine(); // Optionally mark as pristine
          this.phone.control.markAsUntouched(); // Optionally mark as untouched
          this.comments.nativeElement.value = '';
        },
        error: (error) => {
          // Handle error response here
          this.isSpinner = false;
          this.alertMessage = {
            icon: 'warning',
            title: 'Oops!',
            text: 'Some error occurred. Please try again later.',
            confirmButtonText: 'OK'
          };
          Swal.fire(this.alertMessage);
        }
  
      });

    }
    else{
      this.alertMessage = {
        icon: 'warning',
        title: 'Oops!',
        text: 'Please Fill the form Correctly',
        confirmButtonText: 'OK'
      };
      Swal.fire(this.alertMessage);
    }
  }

  private _filter(value: string): CountryData {
    const filterValue = value.toLowerCase();
    return {
      countries: this.countryCode.countries.filter(country =>
        (country.name.toLowerCase().includes(filterValue) || country.code.includes(filterValue))
      )
    };

  }

  getCountryCode(){
    this.jsonDataService.getJsonData().subscribe({
      next: (response) => {
        this.countryCode = response;
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }

    });
  }

  async getSocialMedia() {
    this.socialMedia_list = await this.sanityService.getSocialMedia()
    for(let i=0; i<this.socialMedia_list.length; i++){
      let title = this.socialMedia_list[i]["title"]
      if(title=="linkedin"){
        this.linkedinUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="twitter"){
        this.twitterUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="instagram"){
        this.instagramUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="facebook"){
        this.facebookUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="youtube"){
        this.youtubeUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="github"){
        this.githubUrl = this.socialMedia_list[i]["url"]
      }
      if(title=="kaggle"){
        this.kaggleUrl = this.socialMedia_list[i]["url"]
      }
    }
  }

  onShowSocialMedia(){
    this.isSocialMedia = true;
  }

  onHideSocialMedia(){
    this.isSocialMedia = false;
  }


}
