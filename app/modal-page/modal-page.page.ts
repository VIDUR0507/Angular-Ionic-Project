import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StoreDataService } from '../service/store-data.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  name: any;
  modalForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private storage: StoreDataService
  ) {
    this.modalForm = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3),
        ])
      ),
      address: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data: any) {
    return this.modalCtrl.dismiss(this.name, 'confirm');
    // this.storage.getfromStorage('modal').then((el: any) => {
    //   if (el != null) {
    //     let modalData = el;
    //     modalData.push(data);
    //     this.storage.saveIntoStorage('modalkey', modalData);
    //     return this.modalCtrl.dismiss(modalData, 'confirm');
    //   } else {
    //     let newData: any = [];
    //     newData.push(data);
    //     this.storage.saveIntoStorage('modalkey', newData);
    //     return this.modalCtrl.dismiss(newData, 'confirm');
    //   }
    // });
  }
}
