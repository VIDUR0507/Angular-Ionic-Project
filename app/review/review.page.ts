import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../service/store-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  form: FormGroup;
  constructor(private storage: StoreDataService, private router: Router) {
    this.form = new FormGroup({
      comment: new FormControl(
        '',
        Validators.compose([Validators.maxLength(30)])
      ),
    });
    let value = this.router.getCurrentNavigation()?.extras.queryParams;
    console.log('Data', value);
  }

  ngOnInit() {}

  Submit(data: any) {
    console.log(this.form.value);
    this.storage.getfromStorage('review').then((el: any) => {
      if (el != null) {
        let existedReview = el;
      } else {
        let newReview: any = [];
        newReview.push(data);
        this.storage.saveIntoStorage('review', newReview);
      }
    });
  }
}
