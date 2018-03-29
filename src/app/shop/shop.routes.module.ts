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
import {ShopTemplateOneModule} from './store-template-1/store-template-1.module';

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
                loadChildren: './store-template-1/store-template-1.module#ShopTemplateOneModule'
              },
              {
                path: '2',
                loadChildren: './store-template-2/store-template-2.module#ShopTemplateTwoModule'
              },
              {
                path: '3',
                loadChildren: './store-template-3/store-template-3.module#ShopTemplateThreeModule'
              },
              {
                path: '4',
                loadChildren: './store-template-4/store-template-4.module#ShopTemplateFourModule'
              },
              {
                path: '5',
                loadChildren: './store-template-5/store-template-5.module#ShopTemplateFiveModule'
              },
              {
                path: '6',
                loadChildren: './store-template-6/store-template-6.module#ShopTemplateSixModule'
              }
            ]
          }, {
            path: 'edit', component: StoreEditComponent,
            children: [
              {
                path: '1',
                loadChildren: './store-edit-1/store-template-1.module#StoreTemplateOneModule'
              },
              {
                path: '2',
                loadChildren: './store-edit-2/store-template-2.module#StoreTemplateTwoModule'
              },
              {
                path: '3',
                loadChildren: './store-edit-3/store-template-3.module#StoreTemplateThreeModule'
              },
              {
                path: '4',
                loadChildren: './store-edit-4/store-template-4.module#StoreTemplateFourModule'
              },
              {
                path: '5',
                loadChildren: './store-edit-5/store-template-5.module#StoreTemplateFiveModule'
              },
              {
                path: '6',
                loadChildren: './store-edit-6/store-template-6.module#StoreTemplateSixModule'
              }
            ]
          }]
      }, {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }, {
        path: 'settings', component: SettingsComponent
      }, {
        path: 'listings',
        loadChildren: './listings/listings.module#ListingsModule'
      }, {
        path: 'blog',
        loadChildren: './blog/blog.module#BlogModule'
      },
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
      },{
        path: 'report',
        loadChildren: './report/report.module#ReportModule'
      }, {
        path: 'reward',
        loadChildren: './reward/reward.module#RewardModule'
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
