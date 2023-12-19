import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  form: FormGroup;

  constructor(private storage: StoreDataService, private router: Router) {
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
    this.filldata();
  }

  ngOnInit() {}

  filldata() {
    this.storage.getfromStorage('login@user').then((userdata: any) => {
      if (userdata != null) {
        const existingdata = userdata;
        this.form.patchValue(existingdata);
        console.log('patchData', existingdata);
      }
    });
  }

  onUpdate() {
    this.storage.saveIntoStorage('login@user', this.form.value);
    this.storage.getfromStorage('user').then((userdata: any) => {
      if (userdata != null) {
        let profiledata = userdata;
        let index = profiledata.findIndex(
          (res: any) => this.form.get('email')?.value === res.email
        );
        if (index != -1) {
          profiledata[index] = this.form.value;
          console.log('data', profiledata);
          this.storage.saveIntoStorage('user', profiledata);
        }
      }
    });

    this.router.navigate(['/view-details']);
  }
}
