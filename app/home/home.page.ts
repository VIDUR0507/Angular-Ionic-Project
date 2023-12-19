import { Component } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import {
  ActionSheetController,
  MenuController,
  ModalController,
} from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';
import { NotificationService } from '../service/notification.service';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  productDetails: any = '';

  loginmail: any;
  countCartItems: any;

  filterItem: any;
  isFilterActive: boolean = false;
  msg: any;

  constructor(
    private storage: StoreDataService,
    private router: Router,
    private alert: AlertService,
    private menuCtrl: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private notify: NotificationService,
    private modalCtrl: ModalController
  ) {
    // this.index = this.actRoute.snapshot.paramMap.get('productId');
    // console.log('CardIndex:' + this.index);

    //use of behaviour subject
    this.notify.countSubject.subscribe((count: any) => {
      this.countCartItems = count;
      console.log('Received count in HomePage:', count);
    });

    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el == null) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.productshow();
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        this.loginmail = el.email;
        console.log('User who is login now', this.loginmail);
      }
    });
    this.cart();
  }

  cart() {
    this.storage.getfromStorage('cart').then((cardData: any) => {
      if (cardData != null) {
        let cartDetails = cardData;
        let sameEmailProducts = cartDetails.filter(
          (elements: any) => elements.email == this.loginmail
        );
        this.countCartItems = sameEmailProducts.length;
        this.notify.updateCount(this.countCartItems);
        if (sameEmailProducts.length > 0) {
          console.log('Cart products', sameEmailProducts);
        } else {
          console.log('No product of same Email');
        }
      }
    });
  }

  togglemenu() {
    this.menuCtrl.toggle();
    console.log('Ion-menu Open');
  }

  productshow() {
    this.storage.getfromStorage('product').then((ProductData: any) => {
      if (ProductData != null) {
        this.productDetails = ProductData;
        console.log('Total Products', this.productDetails);
      }
    });
  }

  async ActionSheet(data: any, event: any) {
    event?.stopPropagation();

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

  alertbutton(data: any) {
    this.alert
      .presentAlertWithBtns('Are you sure you want to remove Product?')
      .then((res: any) => {
        if (res) {
          this.delete(data);
          console.log('alert', data);
        } else {
          console.log('Nothing to be deleted');
        }
      });
  }

  delete(data: any) {
    this.storage.getfromStorage('product').then((elements: any) => {
      if (elements != null) {
        let product = elements;
        let index = product.findIndex(
          (res: any) => res.productId == data.productId
        );
        console.log('result', index);
        if (index >= 0) {
          let removed = product.splice(index, 1);
          console.log('RemovedData:', removed);
          this.storage.saveIntoStorage('product', product);
          this.productshow();
        }
      }
    });
  }

  sendProductData(data: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: data,
    };
    this.router.navigate(['/product-details'], navigationExtras);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }

  handlesearchBar(event: any) {
    this.filterItem = this.productDetails.filter(
      (element: any) =>
        element.title
          .trim()
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) > -1
    );
    console.log('search', this.filterItem);
    if (this.filterItem.length > 0) {
      this.isFilterActive = true;
    } else {
      this.filterItem = this.productDetails;
      this.isFilterActive = false;
    }
  }
  

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.msg = `Hello, ${data}!`;
      // this.storage.getfromStorage('modalkey').then((res: any) => {
      //   this.msg = res;
      // });
    }
  }

  handleRefresh(event: any) {
    this.router.navigate(['/cart']);
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
