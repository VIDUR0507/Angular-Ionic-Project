import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../service/alert.service';
import { ToastController } from '@ionic/angular';
import { NotificationService } from '../service/notification.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  form: FormGroup;

  cartDetails: any = [];
  loginEmail: any;
  quantityValue: any;

  productPrice: any;
  sameEmailProducts: any = [];
  count: any = 0;
  totalPrice: any;
  like: any = 0;
  dislike: any = 0;

  constructor(
    private storage: StoreDataService,
    private alert: AlertService,
    private toast: ToastController,
    private notify: NotificationService,
    private router: Router
  ) {
    this.form = new FormGroup({
      quantity: new FormControl('', Validators.compose([Validators.required])),
    });

    this.storage.getfromStorage('login@user').then((el: any) => {
      this.loginEmail = el.email;
      console.log('UserEmail who is login', this.loginEmail);
    });
  }

  ionViewWillEnter() {
    this.cart();
  }

  ngOnInit() {}

  cart() {
    this.storage.getfromStorage('cart').then((res: any) => {
      if (res != null) {
        this.cartDetails = res;
        this.sameEmailProducts = this.cartDetails.filter(
          (elements: any) => elements.email == this.loginEmail
        );
        this.count = this.sameEmailProducts.length;
        console.log('countProduct', this.count);
        this.notify.updateCount(this.count);
        if (this.sameEmailProducts.length > 0) {
          this.totalProductPrice();
          console.log('cart', this.sameEmailProducts);
        } else {
          console.log('No product of same Email');
        }
      }
    });
  }

  removeproduct(cartData: any) {
    this.storage.getfromStorage('cart').then((elements: any) => {
      if (elements != null) {
        let index = this.cartDetails.findIndex(
          (res: any) =>
            res.productId == cartData.productId && res.email == this.loginEmail
        );
        console.log('result', index);
        if (index >= 0) {
          let removed = this.cartDetails.splice(index, 1);
          console.log('RemovedData:', removed);
          this.storage.saveIntoStorage('cart', this.cartDetails);
          this.cart();
        }
      }
    });
  }

  alertbutton(cartData: any) {
    this.alert
      .presentAlertWithBtns('Are you sure you want to remove Product?')
      .then((res: any) => {
        if (res) {
          this.removeproduct(cartData);
          console.log('removedData', cartData);
        } else {
          console.log('Nothing to be deleted');
        }
      });
  }

  updateQuantity(cartData: any, type: any) {
    if (type === 'plus') {
      cartData.quantityValue++;
    } else if (type === 'minus' && cartData.quantityValue > 1) {
      cartData.quantityValue--;
    } else {
      cartData.quantityValue = 1;
    }
    console.log(cartData.quantityValue);
    this.totalProductPrice();
  }

  updateCart(cartData: any) {
    console.log('>>>', this.cartDetails);

    let index = this.cartDetails.findIndex(
      (el: any) =>
        el.productId == cartData.productId && el.email == cartData.email
    );
    console.log(index);
    if (index != -1) {
      this.cartDetails[index] = cartData;
      this.cartDetails[index].email = this.loginEmail;
      this.storage.saveIntoStorage('cart', this.cartDetails);
      this.presentToast('bottom', 'Product Quantity Updated');
    }
    //this.totalProductPrice();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  checkout() {
    this.alert.presentAlert('Shopping SuccessFul');
  }

  // countCartItems() {
  //   this.notify.updateCount(this.count);
  // }

  totalProductPrice() {
    this.totalPrice = 0;
    this.sameEmailProducts.forEach((element: any) => {
      // this.totalPrice += element.pricing[0].price * element.quantityValue;
      this.totalPrice =
        this.totalPrice + element.pricing[0].price * element.quantityValue;
    });
    console.log('pricetotal', this.totalPrice);
  }

  sendProductData(data: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: data,
    };
    this.router.navigate(['/review'], navigationExtras);
  }

  counter(type: any) {
    if (type == 'like') {
      this.like++;
      console.log(this.like);
    } else if (type == 'dislike') {
      this.dislike++;
      console.log(this.dislike);
    }
  }

  isLiked: boolean = false;
  totalLikes: number = 0;

  toggleLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.totalLikes++;
      // Here you might perform other actions like updating the server/database
    } else {
      this.totalLikes--;
      // Similarly, you might want to update the server/database
    }
  }
}
