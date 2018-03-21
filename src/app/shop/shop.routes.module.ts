import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ShopComponent} from './shop/shop.component';
import {ShopErrorComponent} from './shop-error/shop-error.component';
import {StoreComponent} from './store/store.component';
import {SettingsComponent} from './settings/settings.component';
import {StorePreviewComponent} from './store-preview/store-preview.component';
import {StoreEditComponent} from './store-edit/store-edit.component';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {StoreFrontComponent} from './store-front/store-front.component';

const routes: Routes = [
  {
    path: '', component: ShopComponent,
    children: [
      {
        path: 'store/settings', component: StoreComponent
      }, {
        path: 'templates', component: StoreFrontComponent,
        children: [
          {
            path: 'preview', component: StorePreviewComponent,
            children: [
              {
                path: '1',
                loadChildren: 'app/shop/store-template-1/store-template-1.module#StoreTemplateOneModule'
              },
              {
                path: '2',
                loadChildren: 'app/shop/store-template-2/store-template-2.module#StoreTemplateTwoModule'
              },
              {
                path: '3',
                loadChildren: 'app/shop/store-template-3/store-template-3.module#StoreTemplateThreeModule'
              },
              {
                path: '4',
                loadChildren: 'app/shop/store-template-4/store-template-4.module#StoreTemplateFourModule'
              },
              {
                path: '5',
                loadChildren: 'app/shop/store-template-5/store-template-5.module#StoreTemplateFiveModule'
              },
              {
                path: '6',
                loadChildren: 'app/shop/store-template-6/store-template-6.module#StoreTemplateSixModule'
              }
            ]
          }, {
            path: 'edit', component: StoreEditComponent,
            children: [
              {
                path: '',
                loadChildren: 'app/shop/store-edit-1/store-template-1.module#StoreTemplateOneModule'
              },
              {
                path: '1',
                loadChildren: 'app/shop/store-edit-2/store-template-2.module#StoreTemplateTwoModule'
              },
              {
                path: '2',
                loadChildren: 'app/shop/store-edit-3/store-template-3.module#StoreTemplateThreeModule'
              },
              {
                path: '3',
                loadChildren: 'app/shop/store-edit-4/store-template-4.module#StoreTemplateFourModule'
              },
              {
                path: '4',
                loadChildren: 'app/shop/store-edit-5/store-template-5.module#StoreTemplateFiveModule'
              },
              {
                path: '5',
                loadChildren: 'app/shop/store-edit-6/store-template-6.module#StoreTemplateSixModule'
              }
            ]
          }]
      }, {
        path: 'dashboard',
        loadChildren: 'app/shop/dashboard/dashboard.module#DashboardModule'
      }, {
        path: 'settings', component: SettingsComponent
      }, {
        path: 'listings',
        loadChildren: 'app/shop/listings/listings.module#ListingsModule'
      }, {
        path: 'blog',
        loadChildren: 'app/shop/blog/blog.module#BlogModule'
      },
      {
        path: 'account',
        loadChildren: 'app/shop/account/account.module#AccountModule'
      },{
        path: 'report',
        loadChildren: 'app/shop/report/report.module#ReportModule'
      }, {
        path: 'todolist', component: ToDoListComponent
      }, {
        path: 'error', component: ShopErrorComponent
      }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: '**',
        redirectTo: 'error',
        pathMatch: 'full'
      }
    ]
  }, {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
