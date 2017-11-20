import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component.ts';
import { StoreListComponent } from './store-list/store-list.component.ts';
import { StoreListDetailComponent } from './store-detail/store-list-detail.component.ts';
import { StoreDetailComponent } from './store-detail/store-detail.component.ts';

const routes: Routes = [{
  path: 'template-3', component: MainPageComponent,
  children: [{
    path: 'detail/:id', component: StoreDetailComponent
  }]
}, {
  path: 'template-3/list', component: StoreListComponent,
  children: [{
    path: ':id', component: StoreListDetailComponent
  }]
}, {
  path: '',
  redirectTo: 'template-3'
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreTemplateThreeRoutingModule{ }
