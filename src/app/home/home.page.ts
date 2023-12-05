import { Component } from '@angular/core';
import { ApiService } from '../ApiService/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: any = [];
  image: any;
  constructor(private api: ApiService) {
    this.showdata();
    this.postData();
  }

  showdata() {
    this.api.getApiData().subscribe(
      (data: any) => {
        console.log('api', data);
        this.products = data.products;
        console.log('res', this.products);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  postData() {
    const data = this.products;
    console.log('data', data);

    this.api.postApiData(data).subscribe(
      (response: any) => {
        console.log('API Response:', response);
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );
  }
}
