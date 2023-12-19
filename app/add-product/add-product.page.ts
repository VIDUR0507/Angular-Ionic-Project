import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../service/alert.service';

// import { PopoverController } from '@ionic/angular';
// import { PopoverContentComponent } from '../popover-content/popover-content.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  // @ViewChild('popover') popover: any;

  form: FormGroup;
  existingProduct: any = [];
  newProduct: any = [];
  logindetails: any = [];
  quantity: any = 1;
  emailValue: any;
  num: any = 1000;

  url: any;
  imageFilename: any;
  fileContent: any;
  formArrayID: any;

  timevalue: any = '';
  timevalue2: any = '';
  timevalue3: any = '';
  timevalue4: any = '';
  timevalue5: any = '';
  timevalue6: any = '';
  timevalue7: any = '';
  timevalue8: any = '';
  timevalue9: any = '';
  timevalue10: any = '';
  timevalue11: any = '';
  timevalue12: any = '';
  timevalue13: any = '';
  timevalue14: any = '';

  constructor(
    private storage: StoreDataService,
    private router: Router,
    private formbuilder: FormBuilder,
    private alert: AlertService
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),

      mondayfrom: new FormControl(''),
      monday: new FormControl(false),
      mondayto: new FormControl(''),

      tuesdayfrom: new FormControl(''),
      tuesday: new FormControl(false),
      tuesdayto: new FormControl(''),

      wednesdayfrom: new FormControl(''),
      wednesday: new FormControl(false),
      wednesdayto: new FormControl(''),

      thursdayfrom: new FormControl(''),
      thursday: new FormControl(false),
      thursdayto: new FormControl(''),

      fridayfrom: new FormControl(''),
      friday: new FormControl(false),
      fridayto: new FormControl(''),

      saturdayfrom: new FormControl(''),
      saturday: new FormControl(false),
      saturdayto: new FormControl(''),

      sundayfrom: new FormControl(''),
      sunday: new FormControl(false),
      sundayto: new FormControl(''),

      // quantity: new FormControl(
      //   null,
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern('[0-9]*'),
      //     Validators.min(1),
      //   ])
      // ),

      pricing: this.formbuilder.array([this.pricingfields()]),
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.authenticate();
  }

  pricingfields(): FormGroup {
    return this.formbuilder.group({
      pricetype: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  addprice(index: any) {
    index = this.pricingLength;
    console.log('>>>', index);
    if (index < 4) {
      let control = this.pricingfields();
      (<FormArray>this.form.get('pricing')).push(control);
    } else {
      console.log('PricingField cannot be added');
    }
  }

  get priceControls() {
    return (<FormArray>this.form.get('pricing')).controls;
  }

  get pricingLength() {
    return (<FormArray>this.form.get('pricing')).length;
  }

  removeprice(index: any) {
    console.log(index);
    if (index > 0) {
      (<FormArray>this.form.get('pricing')).removeAt(index);
    }
  }

  onSubmit(data: any) {
    console.log('data', data);
    if (this.logindetails != null) {
      this.emailValue = this.logindetails.email;
      console.log('result', this.emailValue);
      this.storage.getfromStorage('product').then((productData: any) => {
        if (productData != null) {
          this.existingProduct = productData;
          console.log(this.existingProduct);

          data.email = this.emailValue;
          data.productId = this.getRandom();
          data.image = this.url;

          data.mondayfrom = this.timevalue3;
          data.mondayto = this.timevalue4;

          data.tuesdayfrom = this.timevalue;
          data.tuesdayto = this.timevalue2;

          data.wednesdayfrom = this.timevalue5;
          data.wednesdayto = this.timevalue6;

          data.thursdayfrom = this.timevalue7;
          data.thursdayto = this.timevalue8;

          data.fridayfrom = this.timevalue9;
          data.fridayto = this.timevalue10;

          data.saturdayfrom = this.timevalue11;
          data.saturdayto = this.timevalue12;

          data.sundayfrom = this.timevalue13;
          data.sundayto = this.timevalue14;

          this.existingProduct.push(data);
          this.storage.saveIntoStorage('product', this.existingProduct);
          this.alert.presentAlert('Product Added Successfully');
        } else {
          data.email = this.emailValue;
          data.productId = this.getRandom();
          data.image = this.url;

          data.mondayfrom = this.timevalue3;
          data.mondayto = this.timevalue4;

          data.tuesdayfrom = this.timevalue;
          data.tuesdayto = this.timevalue2;

          data.wednesdayfrom = this.timevalue5;
          data.wednesdayto = this.timevalue6;

          data.thursdayfrom = this.timevalue7;
          data.thursdayto = this.timevalue8;

          data.fridayfrom = this.timevalue9;
          data.fridayto = this.timevalue10;

          data.saturdayfrom = this.timevalue11;
          data.saturdayto = this.timevalue12;

          data.sundayfrom = this.timevalue13;
          data.sundayto = this.timevalue14;

          this.newProduct.push(data);
          console.log(this.newProduct);
          this.storage.saveIntoStorage('product', this.newProduct);
          this.alert.presentAlert('Product Added Successfully');
        }
      });
    } else {
      console.log('User not login');
    }
    this.router.navigate(['/home/']);
    this.form.reset();
  }

  // plus() {
  //   this.form.value.quantity = this.quantity++;
  //   console.log(this.form.value.quantity);
  // }

  // minus() {
  //   if (this.quantity != 1) {
  //     this.form.value.quantity = this.quantity--;
  //     console.log(this.form.value.quantity);
  //   }
  // }

  getRandom() {
    return Math.floor(Math.random() * this.num) + 1;
  }

  formatTime(value: any) {
    return format(parseISO(value), 'hh:mm a');
  }

  // presentPopover(e: Event) {
  //   this.popover.event = e;
  //   this.isOpen = true;
  // }

  authenticate() {
    this.storage.getfromStorage('login@user').then((res: any) => {
      if (res != null) {
        this.logindetails = res;
        console.log(this.logindetails);
      }
    });
  }

  setimage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log('Imageurl', this.url);
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  }

  FileUploadUsingIcon() {
    let imageFile = document.createElement('input');
    console.log('file', imageFile);
    (imageFile.style.display = 'none'),
      (imageFile.name = 'file'),
      (imageFile.type = 'file'),
      (imageFile.accept = 'jpg');
    imageFile.click();
    imageFile.addEventListener('change', () => {
      console.log('change');
      if (imageFile.files) {
        this.imageFilename = imageFile.files[0];
        console.log('jpgfile', this.imageFilename);
      }
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imageFilename = event.target?.result;
        // console.log("url", this.url);
      };
      reader.readAsDataURL(this.imageFilename);
    });
  }
}
