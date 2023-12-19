import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProductViewPageRoutingModule } from './user-product-view-routing.module';

import { UserProductViewPage } from './user-product-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProductViewPageRoutingModule
  ],
  declarations: [UserProductViewPage]
})
export class UserProductViewPageModule {}
