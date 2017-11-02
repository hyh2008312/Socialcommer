import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreListDetailComponent } from './store-detail/store-list-detail.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';

const routes: Routes = [{
  path: ':name', component: MainPageComponent,
  children: [{
    path: 'detail/:id', component: StoreDetailComponent
  }]
}, {
  path: ':name/list', component: StoreListComponent,
  children: [{
    path: ':id', component: StoreListDetailComponent
  }]
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreRoutingModule{ }
