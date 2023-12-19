import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPagePageRoutingModule } from './modal-page-routing.module';

import { ModalPagePage } from './modal-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPagePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ModalPagePage],
})
export class ModalPagePageModule {}
