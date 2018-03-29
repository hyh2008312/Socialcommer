import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'account',
        loadChildren: './login/login.module#LoginModule'
      }, {
        path: 'shop',
        canActivate: [ ProtectedGuard ],
        loadChildren: './shop/shop.module#ShopModule'
      }, {
        path: 'store',
        loadChildren: './store/store.module#StoreModule'
      }, {
        path: '',
        loadChildren: './landing-page/landing-page.module#LandingPageModule'
      }, {
        path: 'about',
        loadChildren: './about/about.module#AboutModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: ''
  }
];

// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled' });
