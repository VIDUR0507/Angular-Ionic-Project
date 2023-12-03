import { Component } from '@angular/core';
import { ApiService } from '../ApiService/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: any = [];
  constructor(private api: ApiService) {
    this.showdata();
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

  postdata() {
    let data = 'My name is vidur';
    this.api.postApiData(data).subscribe((res: any) => {
      console.log('post', res.data);
    });
  }
}
