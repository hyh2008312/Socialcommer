import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreListDetailComponent} from './store-detail/store-list-detail.component';

const routes: Routes = [{
  path: '', component: MainPageComponent,
  children: [{
    path: '', component: HomePageComponent,
    children: [{
      path: 'detail/:id', component: StoreDetailComponent
    }]
  }, {
    path: 'list', component: StoreListComponent,
    children: [{
      path: ':id', component: StoreListDetailComponent
    }]
  }, {
    path: 'about_me', component: AboutMeComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTemplateTwoRoutingModule {
}
