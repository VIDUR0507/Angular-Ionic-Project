import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import { NavigationExtras, Router } from '@angular/router';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  urlValue: any;
  emailValue: any;
  newProducts: any = [];
  cartDetails: any = [];
  quantityValue: any = 1;

  constructor(
    private storage: StoreDataService,
    private router: Router,
    private alert: AlertService
  ) {
    this.urlValue = this.router.getCurrentNavigation()?.extras.queryParams;
    console.log('Data send through QueryParam from Homepage', this.urlValue);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        this.emailValue = el.email;
        console.log('User who is login', this.emailValue);
      }
    });
  }

  productcart(data: any) {
    this.storage.getfromStorage('cart').then((res: any) => {
      if (res != null) {
        this.cartDetails = res;
        console.log('cart', this.cartDetails);
        let sameEmailProducts = this.cartDetails.filter(
          // fetch products with same email
          (elements: any) => elements.email == this.emailValue
        );
        console.log('sameEmailProducts', sameEmailProducts);
        if (sameEmailProducts.length > 0) {
          //If for same email
          let productIndex = sameEmailProducts.findIndex(
            (el: any) =>
              el.productId === data.productId && el.email == this.emailValue
          );
          console.log('>>>', productIndex);
          if (productIndex != -1) {
            this.alert.presentAlert('Product already exists in cart');
          } else {
            data.email = this.emailValue;
            data.quantityValue = this.quantityValue;
            this.cartDetails.push(data);
            this.storage.saveIntoStorage('cart', this.cartDetails);
            console.log('UserEmail', this.emailValue);
            this.router.navigate(['/cart']);
          }
        } else {
          //for different email
          data.email = this.emailValue;
          data.quantityValue = this.quantityValue;
          this.cartDetails.push(data);
          this.storage.saveIntoStorage('cart', this.cartDetails);
          console.log('UserEmail', this.emailValue);
          this.router.navigate(['/cart']);
        }
      } else {
        //When Cart is empty
        data.email = this.emailValue;
        data.quantityValue = this.quantityValue;
        this.newProducts.push(data);
        console.log('new', this.newProducts);
        this.storage.saveIntoStorage('cart', this.newProducts);
        this.router.navigate(['/cart']);
      }
    });
  }

  Update(data: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: data,
    };
    this.router.navigate(['/edit-product'], navigationExtras);
    console.log('res', data);
  }

  // delete(data: any) {
  //   this.storage.getfromStorage('product').then((elements: any) => {
  //     if (elements != null) {
  //       let product = elements;
  //       let index = product.findIndex(
  //         (res: any) => res.productId == data.productId
  //       );
  //       console.log('result', index);
  //       if (index >= 0) {
  //         let removed = product.splice(index, 1);
  //         console.log('RemovedData:', removed);
  //         this.storage.saveIntoStorage('product', product);
  //       }
  //     }
  //   });
  // }
}
