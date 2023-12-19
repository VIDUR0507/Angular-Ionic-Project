import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'update',
    loadChildren: () =>
      import('./update/update.module').then((m) => m.UpdatePageModule),
  },
  {
    path: 'view-details',
    loadChildren: () =>
      import('./view-details/view-details.module').then(
        (m) => m.ViewDetailsPageModule
      ),
  },
  {
    path: 'add-product',
    loadChildren: () =>
      import('./add-product/add-product.module').then(
        (m) => m.AddProductPageModule
      ),
  },
  {
    path: 'user-product-view',
    loadChildren: () =>
      import('./user-product-view/user-product-view.module').then(
        (m) => m.UserProductViewPageModule
      ),
  },
  {
    path: 'edit-product',
    loadChildren: () =>
      import('./edit-product/edit-product.module').then(
        (m) => m.EditProductPageModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'product-details',
    loadChildren: () =>
      import('./product-details/product-details.module').then(
        (m) => m.ProductDetailsPageModule
      ),
  },
  {
    path: 'modal-page',
    loadChildren: () =>
      import('./modal-page/modal-page.module').then(
        (m) => m.ModalPagePageModule
      ),
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
