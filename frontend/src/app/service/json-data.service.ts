import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {  
  
  private apiUrl = 'assets/json/country-code.json'; // path to your JSON file or API endpoint

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
