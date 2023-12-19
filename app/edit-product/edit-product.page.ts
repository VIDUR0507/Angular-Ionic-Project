import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  form: FormGroup;

  urlValue: any;
  loginDetails: any = [];
  formArrayID: any;

  patchdata: any = [];

  imageUrl: any;

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
    private actRoute: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),

      email: new FormControl('', Validators.compose([Validators.required])),
      productId: new FormControl('', Validators.compose([Validators.required])),

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

      // Form Array Declaration
      pricing: this.formbuilder.array([this.pricingfields()]),
    });

    this.urlValue = this.router.getCurrentNavigation()?.extras.queryParams;
    console.log('UrlValue', this.urlValue);
    this.filldata();
  }

  ngOnInit() {}

  ionViewWillEnter() {}

  pricingfields(): FormGroup {
    return this.formbuilder.group({
      pricetype: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  addprice(formArrayLength: any) {
    formArrayLength = this.pricingLength;
    console.log('>>>', formArrayLength);
    if (formArrayLength < 4) {
      let control = this.pricingfields();
      (<FormArray>this.form.get('pricing')).push(control);
    } else {
      console.log('PricingField not be added');
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

  filldata() {
    let loginmail: any;

    this.storage.getfromStorage('login@user').then((userData: any) => {
      if (userData != null) {
        this.loginDetails = userData;
        console.log(this.loginDetails);
        loginmail = this.loginDetails.email;
        console.log('result', loginmail);
      }
    });

    this.storage.getfromStorage('product').then((data: any) => {
      if (data != null) {
        let productDetails = data;

        let SameEmailProducts = productDetails.filter(
          (res: any) => loginmail == res.email
        );
        console.log('result', SameEmailProducts);

        let index = SameEmailProducts.findIndex(
          (el: any) => el.productId == this.urlValue.productId
        );
        console.log('>>>', index);
        if (index > -1) {
          this.patchdata = SameEmailProducts[index];
          this.form.patchValue(this.patchdata);

          const pricingArray = <FormArray>this.form.get('pricing');
          pricingArray.clear();

          this.patchdata.pricing.forEach((item: any) => {
            console.log('PricingArrayControls', item);
            pricingArray.push(this.formbuilder.group(item));
          });

          console.log('patch', this.patchdata);
          console.log('formArray', this.patchdata.pricing);

          this.timevalue3 = this.patchdata.mondayfrom;
          this.timevalue4 = this.patchdata.mondayto;

          this.timevalue = this.patchdata.tuesdayfrom;
          this.timevalue2 = this.patchdata.tuesdayto;

          this.timevalue5 = this.patchdata.wednesdayfrom;
          this.timevalue6 = this.patchdata.wednesdayto;

          this.timevalue7 = this.patchdata.thursdayfrom;
          this.timevalue8 = this.patchdata.thursdayto;

          this.timevalue9 = this.patchdata.fridayfrom;
          this.timevalue10 = this.patchdata.fridayto;

          this.timevalue11 = this.patchdata.saturdayfrom;
          this.timevalue12 = this.patchdata.saturdayto;

          this.timevalue13 = this.patchdata.sundayfrom;
          this.timevalue14 = this.patchdata.sundayto;

          this.imageUrl = this.patchdata.image;
        }
      }
    });
  }

  onUpdate() {
    this.storage.getfromStorage('product').then((data: any) => {
      if (data != null) {
        let details = data;
        let index = details.findIndex(
          (res: any) => res.productId == this.urlValue.productId
        );
        console.log('Update index of product key', index);
        console.log('formValues', this.form.value);
        details[index] = this.form.value;

        details[index].mondayfrom = this.timevalue3;
        details[index].mondayto = this.timevalue4;

        details[index].tuesdayfrom = this.timevalue;
        details[index].tuesdayto = this.timevalue2;

        details[index].wednesdayfrom = this.timevalue5;
        details[index].wednesdayto = this.timevalue6;

        details[index].thursdayfrom = this.timevalue7;
        details[index].thursdayto = this.timevalue8;

        details[index].fridayfrom = this.timevalue9;
        details[index].fridayto = this.timevalue10;

        details[index].saturdayfrom = this.timevalue11;
        details[index].saturdayto = this.timevalue12;

        details[index].sundayfrom = this.timevalue13;
        details[index].sundayto = this.timevalue14;

        details[index].image = this.imageUrl;

        console.log('details', details[index]);
        this.storage.saveIntoStorage('product', details);
      }
      this.router.navigate(['/user-product-view']);
    });
  }

  formatTime(value: any) {
    return format(parseISO(value), 'hh:mm a');
  }

  setimage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        console.log('url', this.imageUrl);
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  }

  toggleChanged(event: any, type: any) {
    const newValue = event.detail.checked;
    console.log('Day:', type, 'ToggleValue:', newValue);
    if (type == 'monday') {
      this.timevalue3 = 'select';
      this.timevalue4 = 'select';
    } else if (type == 'tuesday') {
      this.timevalue = 'select';
      this.timevalue2 = 'select';
    } else if (type == 'wednesday') {
      this.timevalue5 = 'select';
      this.timevalue6 = 'select';
    } else if (type == 'thursday') {
      this.timevalue7 = 'select';
      this.timevalue8 = 'select';
    } else if (type == 'friday') {
      this.timevalue9 = 'select';
      this.timevalue10 = 'select';
    } else if (type == 'saturday') {
      this.timevalue11 = 'select';
      this.timevalue12 = 'select';
    } else if (type == 'sunday') {
      this.timevalue13 = 'select';
      this.timevalue14 = 'select';
    }
  }
}
