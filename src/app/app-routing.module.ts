import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand/brand-delete/brand-delete.component';
import { BrandDetailComponent } from './components/brand/brand-detail/brand-detail.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorDetailComponent } from './components/color/color-detail/color-detail.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarUpdateComponent } from './components/car-list/car-update/car-update.component';
import { CarAddComponent } from './components/car-list/car-add/car-add.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { UserComponent } from './components/user/user.component';
import { DeleteAccountComponent } from './components/user/delete-account/delete-account.component';
import { UserSettingsComponent } from './components/user/user-settings/user-settings.component';
import { CcListComponent } from './components/credit-card/cc-list/cc-list.component';
import { MyCardsComponent } from './components/user/my-cards/my-cards.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', pathMatch: 'full', component: CarComponent },
  {
    path: 'car-list',
    component: CarListComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'add-car',
        component: CarAddComponent,
      },
      {
        path: 'update-car/:carId',
        component: CarUpdateComponent,
      },
    ],
  },
  { path: 'cars/brands/:brandId', component: CarComponent },
  { path: 'cars/colors/:colorId', component: CarComponent },
  { path: 'rentals', component: RentalComponent },
  { path: 'customers', component: CustomerComponent },

  {
    path: 'brands',
    component: BrandDetailComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'add-brand',
        component: BrandAddComponent,
      },
      {
        path: 'update-brand',
        component: BrandUpdateComponent,
      },
      {
        path: 'delete-brand',
        component: BrandDeleteComponent,
      },
    ],
  },

  {
    path: 'colors',
    component: ColorDetailComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'add-color',
        component: ColorAddComponent,
      },
      {
        path: 'update-color',
        component: ColorUpdateComponent,
      },
      {
        path: 'delete-color',
        component: ColorDeleteComponent,
      },
    ],
  },

  { path: 'cars/detail/:id', component: CarDetailComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  {
    path: 'payments/add',
    component: CreditCardComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'my-credit-cards/:userId',
        component: CcListComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'settings/:userId',
        component: UserSettingsComponent,
      },
      {
        path: 'delete-account/:userId',
        component: DeleteAccountComponent,
      },
      {
        path: 'my-cards/:userId',
        component: MyCardsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
