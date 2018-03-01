import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {StoreListComponent} from './store-list/store-list.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {StoreDetailComponent} from './store-detail/store-detail.component';
import {StoreBlogComponent} from './store-blog/store-blog.component';
import {StoreBlogDetailComponent} from './store-blog-detail/store-blog-detail.component';
import {AboutComponent} from "./about/about.component";
import {FaqComponent} from "./faq/faq.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {ReturnPolicyComponent} from "./return-policy/return-policy.component";

const routes: Routes = [{
  path: '', component: MainPageComponent,
  children: [
    {
      path: '', component: HomePageComponent
    },
    {
      path: 'list', component: StoreListComponent,
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
      path: 'about_me', component: AboutMeComponent
    }, {
      path: 'about', component: AboutComponent
    }, {
      path: 'privacy', component: PrivacyComponent
    }, {
      path: 'faq', component: FaqComponent
    }, {
      path: 'return', component: ReturnPolicyComponent
    }

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTemplateFourRoutingModule {
}
