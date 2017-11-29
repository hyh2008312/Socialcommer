import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { StoreBlogComponent } from './store-blog/store-blog.component';
import { StoreBlogDetailComponent } from './store-blog-detail/store-blog-detail.component';

const routes: Routes = [{
  path: '3', component: MainPageComponent
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreTemplateThreeRoutingModule{ }
