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
        canActivate: [ PublicGuard ],
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
        redirectTo: 'shop',
        pathMatch: 'full'
      }, {
        path: '**',
        redirectTo: 'shop',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{ }
