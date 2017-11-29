import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreBlogComponent } from './store-blog/store-blog.component';
import { StoreBlogDetailComponent } from './store-blog-detail/store-blog-detail.component';

const routes: Routes = [{
  path: '3', component: MainPageComponent,
  children: [{
    path: '', component: HomePageComponent
  }, {
    path: 'collection', component: StoreListComponent
  }, {
    path: 'collection/:id', component: StoreDetailComponent
  }, {
    path: 'blog', component: StoreBlogComponent
  }, {
    path: 'blog/:id', component: StoreBlogDetailComponent
  }, {
    path: 'about_me', component: AboutMeComponent
  }]
}, {
  path: '',
  redirectTo: ''
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreTemplateThreeRoutingModule{ }
