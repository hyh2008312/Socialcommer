import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreBlogComponent} from './store-blog/store-blog.component';
import {StoreBlogDetailComponent} from './store-blog-detail/store-blog-detail.component';
import {StoreListComponent} from './store-list/store-list.component';

const routes: Routes = [{
  path: '', component: MainPageComponent,
  children: [
    {
      path: '', component: HomePageComponent,
    },
    {
      path: 'detail/:id', component: StoreDetailComponent
    },
    {
      path: 'blog', component: StoreBlogComponent
    },
    {
      path: 'blog/:id', component: StoreBlogDetailComponent
    },
    {
      path: 'category/:id', component: StoreListComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTemplateSixRoutingModule {
}
