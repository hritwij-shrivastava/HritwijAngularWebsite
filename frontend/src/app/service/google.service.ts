import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private apiUrl = 'https://script.google.com/macros/s/AKfycbwaTp53dbdsArI6p2wvcjjc45GeFHrtBJzbb9hNeUd2qEh2gIFxXo5MyFZwp8nh--rO1w/exec';

  constructor(private http: HttpClient) { }

  sendPostRequest(data: any): Observable<any> {
    const params = new HttpParams({
      fromObject: data
    });
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    return this.http.post(this.apiUrl, params.toString(), { headers });
  }

}
