import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GuideMainComponent } from './guide-main/guide-main.component';
import { GuideStorePreviewComponent } from './guide-store-preview/guide-store-preview.component';

const routes: Routes = [
  {
    path: '', component: GuideMainComponent,
    children: [
      {
        path: 'preview', component: GuideStorePreviewComponent,
        children: [
          {
            path: '1',
            loadChildren: '../shop-template-1/shop-template-1.module#ShopTemplateOneModule'
          },
          {
            path: '2',
            loadChildren: '../shop-template-2/shop-template-2.module#ShopTemplateTwoModule'
          },
          {
            path: '3',
            loadChildren: '../shop-template-3/shop-template-3.module#ShopTemplateThreeModule'
          },
          {
            path: '4',
            loadChildren: '../shop-template-4/shop-template-4.module#ShopTemplateFourModule'
          },
          {
            path: '5',
            loadChildren: '../shop-template-5/shop-template-5.module#ShopTemplateFiveModule'
          },
          {
            path: '6',
            loadChildren: '../shop-template-6/shop-template-6.module#ShopTemplateSixModule'
          }
        ]
      }, {
        path: 'edit',
        children: [
          {
            path: '1',
            loadChildren: '../store-edit-1/store-template-1.module#StoreTemplateOneModule'
          },
          {
            path: '2',
            loadChildren: '../store-edit-2/store-template-2.module#StoreTemplateTwoModule'
          },
          {
            path: '3',
            loadChildren: '../store-edit-3/store-template-3.module#StoreTemplateThreeModule'
          },
          {
            path: '4',
            loadChildren: '../store-edit-4/store-template-4.module#StoreTemplateFourModule'
          },
          {
            path: '5',
            loadChildren: '../store-edit-5/store-template-5.module#StoreTemplateFiveModule'
          },
          {
            path: '6',
            loadChildren: '../store-edit-6/store-template-6.module#StoreTemplateSixModule'
          }
        ]
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule {
}
