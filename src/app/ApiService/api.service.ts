import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: any = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getApiData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postApiData(value: any): any {
    const item = JSON.stringify(value);
    return this.http.post(this.apiUrl, item);
  }
}
