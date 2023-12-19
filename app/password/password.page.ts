import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  userDetails: any = [];
  details: any = '';
  IsUserFound: boolean = false;

  constructor(private storage: StoreDataService, private alert: AlertService) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
    });

    this.storage.getfromStorage('user').then((el: any) => {
      if (el != null) {
        this.userDetails = el;
      }
    });

    this.form2 = new FormGroup({
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

  search() {
    let emailvalue = this.form.get('email')?.value;
    console.log(emailvalue);
    this.details = this.userDetails.filter(
      (res: any) => emailvalue == res.email
    );

    if (this.details.length > 0) {
      console.log('res', this.details);
      this.IsUserFound = true;
    } else {
      this.IsUserFound = false;
      this.alert.presentAlert('Email Not Found');
    }
  }

  savePassword() {
    console.log(this.details);
    this.details.password = this.form.get('password')?.value;
    this.details.confirmPassword = this.form.get('confirmPassword')?.value;
    console.log('after change', this.details);
  }
}
