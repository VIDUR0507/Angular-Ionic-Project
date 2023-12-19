import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  apiUrl: any = 'https://dummyjson.com';
  apiEndpoints: any = '/products/';
  fullapiUrl: any = this.apiUrl + this.apiEndpoints;

  constructor(private http: HttpClient) {}

  getApiData(): any {
    return this.http.get(this.fullapiUrl);
  }

  postApiData(value: any): any {
    const item = JSON.stringify(value);
    return this.http.post(this.apiEndpoints, item);
  }
}
