import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreDataService } from '../service/store-data.service';
import { AlertService } from '../service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;
  existingdata: any = [];
  newData: any = [];

  constructor(
    private storage: StoreDataService,
    private alert: AlertService,
    private router: Router
  ) {
    this.form = new FormGroup({
      firstname: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ])
      ),
      lastname: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$'
          ),
        ])
      ),
      address: new FormControl('', Validators.compose([Validators.required])),
      contact: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(5),
          Validators.maxLength(5),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
      confirmPassword: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  ngOnInit() {}

  onSubmit(data: any) {
    this.storage.getfromStorage('user').then((userData: any) => {
      if (userData != null) {
        // if user key is not null
        this.existingdata = userData;
        const emailValue = this.form.get('email')?.value;
        let arr2 = this.existingdata.filter(
          (res: any) => emailValue === res.email
        );
        console.log(emailValue);
        if (arr2.length > 0) {
          // if same email occurs during signup of user
          this.alert.presentAlert('Email Already Exists');
        } else {
          // if email is different during signup of user
          this.existingdata.push(data);
          this.storage.saveIntoStorage('user', this.existingdata);
          this.alert.presentAlert('You have successfully create your account');
        }
      } else {
        // if user key is null
        console.log(data);
        this.newData.push(data);
        this.storage.saveIntoStorage('user', this.newData);
        this.alert.presentAlert('You have successfully create your account');
      }
    });
    this.router.navigate(['/login']); // to redirect user to login page after successful registration
  }

  passwordMatchValidator() {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;
    if (password == confirmPassword) {
      return false; // false if there is no validation error
    } else {
      return true; // true if there is  validation error
    }
  }
}
