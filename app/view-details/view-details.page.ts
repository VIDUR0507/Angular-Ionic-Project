import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {
  result: any = '';

  constructor(private storage: StoreDataService) {}

  ionViewWillEnter() {
    this.profile();
    this.allUsers();
  }

  ngOnInit() {}

  profile() {
    this.storage.getfromStorage('login@user').then((res: any) => {
      this.result = res;
      console.log('LoginUser', this.result);
    });
  }

  allUsers() {
    this.storage.getfromStorage('user').then((res: any) => {
      let allUsers = res;
      console.log('UserDetails', allUsers);
    });
  }
}
