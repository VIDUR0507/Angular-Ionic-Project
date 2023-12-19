import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreDataService } from '../service/store-data.service';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private storage: StoreDataService,
    private router: Router,
    private alert: AlertService
  ) {
    this.form = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$'
          ),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.form.reset();
  }

  login() {
    this.storage.getfromStorage('user').then((userdata: any) => {
      if (userdata != null) {
        const emailValue = this.form.get('email')?.value;
        const passwordValue = this.form.get('password')?.value;
        let index = userdata.findIndex(
          (res: any) => emailValue == res.email && passwordValue == res.password
        );
        console.log(index);
        if (index >= 0) {
          const logindetails = userdata[index];
          console.log('Successful login', logindetails);
          this.storage.saveIntoStorage('login@user', logindetails);
          // redirect to homepage if user succesfullly login
          this.storage.getfromStorage('login@user').then((details: any) => {
            if (details != null) {
              this.router.navigate(['/home']);
            }
          });
        } else {
          this.alert.presentAlert('Credentials do not match');
          console.log('Invalid User');
        }
      }
    });
  }

  // showAlert() {
  //   this.alert.presentAlert2('hello');
  // }
}
