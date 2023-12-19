import { Component } from '@angular/core';
import { AlertService } from './service/alert.service';
import { StoreDataService } from './service/store-data.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loginEmail: any;
  countCartItems: any = 0;
  count: any;
  msg: any;

  constructor(
    private alertCtrl: AlertController,
    private storage: StoreDataService,
    private router: Router,
    private notify: NotificationService
  ) {
    this.storage.getfromStorage('login@user').then((el: any) => {
      console.log(el);
      this.loginEmail = el.email;
      console.log('Usermail who is login now', this.loginEmail);
    });

    //Behaviour subject
    this.notify.countSubject.subscribe((count: any) => {
      this.countCartItems = count;
      console.log('Received count in HomePage:', count);
    });

    this.cart();
  }

  ionViewWillEnter() {}

  //it is ion-alert with buttons just name change insted of presentalertwithbuttons its logout
  async logout() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Are you sure to logout??',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.storage.getfromStorage('confirm Cancel:');
            console.log('You are still login');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            //this.storage.getfromStorage('confirm Okay');
            this.storage.removefromStorage('login@user');
            this.router.navigate(['/login/']);
            console.log('Successful Logout');
          },
        },
      ],
    });
    await alert.present();
  }

  cart() {
    this.storage.getfromStorage('cart').then((res: any) => {
      if (res != null) {
        let cartDetails = res;
        let sameEmailProducts = cartDetails.filter(
          (elements: any) => elements.email == this.loginEmail
        );
        this.count = sameEmailProducts.length;
        if (sameEmailProducts.length > 0) {
          return this.count;
        } else {
          console.log('No product of same email');
        }
      }
    });
  }
}
