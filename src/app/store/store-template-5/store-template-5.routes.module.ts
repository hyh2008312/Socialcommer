import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreBlogComponent} from './store-blog/store-blog.component';
import {StoreBlogDetailComponent} from './store-blog-detail/store-blog-detail.component';
import {StoreListComponent} from './store-list/store-list.component';
import {aboutComponent} from "./about/about.component";
import {FaqComponent} from "./faq/faq.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {ReturnPolicyComponent} from "./return-policy/return-policy.component";
import {StoreFlashSaleComponent} from "./store-flash-sale/store-flash-sale.component";

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
      path: 'flash', component: StoreFlashSaleComponent
    },
    {
      path: 'blog/:id', component: StoreBlogDetailComponent
    },
    {
      path: 'category/:id', component: StoreListComponent
    },
    {
      path: 'about', component: aboutComponent
    },
    {
      path: 'faq', component: FaqComponent
    },
    {
      path: 'privacy', component: PrivacyComponent
    },
    {
      path: 'return', component: ReturnPolicyComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTemplateFiveRoutingModule {
}
