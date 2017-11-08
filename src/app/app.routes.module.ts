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
        path: 'cp',
        loadChildren: 'app/login/login.module#LoginModule'
      }, {
        path: 'shop',
        canActivate: [ ProtectedGuard ],
        loadChildren: 'app/shop/shop.module#ShopModule'
      }, {
        path: 'store',
        loadChildren: 'app/store/store.module#StoreModule'
      }, {
        path: '',
        loadChildren: 'app/landing-page/landing-page.module#LandingPageModule'
      }, {
        path: 'about',
        loadChildren: 'app/about/about.module#AboutModule'
      }
    ]
  }
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{ }
