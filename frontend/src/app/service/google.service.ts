import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private apiUrl = 'https://script.google.com/macros/s/AKfycbz4gi9xqN87HF6GdyQS_vBFsDXmGjwsPgTt1ZVJWhfB-sGQ55FwTvearvM8fUkDMi8I/exec';

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
