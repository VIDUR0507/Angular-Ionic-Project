import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-user-product-view',
  templateUrl: './user-product-view.page.html',
  styleUrls: ['./user-product-view.page.scss'],
})
export class UserProductViewPage implements OnInit {
  loginDetails: any = [];
  products: any = [];
  cartDetails: any = [];
  emailValue: any;

  handlerMessage = '';
  roleMessage = '';

  constructor(
    private storage: StoreDataService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private alert: AlertService,
    private alertCtrl: AlertController
  ) {
    this.storage.getfromStorage('login@user').then((loginData: any) => {
      this.loginDetails = loginData;
      this.emailValue = loginData.email;
    });
  }

  UserProducts() {
    this.storage.getfromStorage('product').then((data: any) => {
      if (data != null) {
        this.products = data.filter(
          (el: any) => el.email == this.loginDetails.email
        );
        console.log('products', this.products);

        // this.products.forEach((el: any) => {
        //   this.result = el.pricing;
        //   console.log('res', this.result);
        // });
      }
    });
  }

  ionViewWillEnter() {
    this.UserProducts();
  }

  ngOnInit() {}

  delete(data: any) {
    this.storage.getfromStorage('product').then((elements: any) => {
      if (elements != null) {
        let productDetails = elements;
        let index = productDetails.findIndex(
          (res: any) => res.productId == data.productId
        );
        console.log('result', index);
        if (index >= 0) {
          let removed = productDetails.splice(index, 1);
          console.log('RemovedData:', removed);
          this.storage.saveIntoStorage('product', productDetails);
          this.UserProducts();
        }
      }
    });
  }

  alertbutton(data: any) {
    this.alert
      .presentAlertWithBtns('Are you sure you want to remove Product?')
      .then((res: any) => {
        if (res) {
          this.delete(data);
        } else {
          console.log('Nothing to be deleted');
        }
      });
  }

  async ActionSheet(data: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Edit',
          role: 'selected',
          handler: () => {
            let navigationExtras: NavigationExtras = {
              queryParams: data,
            };
            this.router.navigate(['/edit-product'], navigationExtras);
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.alertbutton(data);
            // this.presentAlert(data, 'are you sure');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
    await actionSheet.present();
  }

  // productcart(item: any) {
  //   this.storage.getfromStorage('cart').then((res: any) => {
  //     if (res != null) {
  //       this.cartDetails = res;
  //       let value = this.cartDetails.filter(
  //         (el: any) => el.email == this.loginDetails.email
  //       );
  //       console.log('Array', value);
  //       if (value.length > 0) {
  //         console.log('values with same mail');
  //       } else {
  //         console.log('values with different mail');
  //       }
  //     } else {
  //       console.log('cart is empty');
  //     }
  //   });
  // }
  async presentAlert(data: any, msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Nothing to be deleted');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.delete(data);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
}
