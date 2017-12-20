import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreListDetailComponent} from './store-detail/store-list-detail.component';
import {StoreBlogComponent} from './store-blog/store-blog.component';

const routes: Routes = [{
  path: '4', component: MainPageComponent,
  children: [
    {
      path: '', component: HomePageComponent,
      children:
        [
          {
            path: 'detail/:id', component: StoreDetailComponent
          }
        ]
    },
    {
      path: 'list', component: StoreListComponent,
      children:
        [
          {
            path: ':id', component: StoreListDetailComponent
          }
        ]
    },
    {
      path: 'blog', component: StoreBlogComponent
    },
    {
      path: 'about_me', component: AboutMeComponent
    }]
}, {
  path: '',
  redirectTo: ''
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTemplateFourRoutingModule {
}
