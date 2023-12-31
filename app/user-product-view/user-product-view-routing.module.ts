import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProductViewPage } from './user-product-view.page';

const routes: Routes = [
  {
    path: '',
    component: UserProductViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProductViewPageRoutingModule {}
