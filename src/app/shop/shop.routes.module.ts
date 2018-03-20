import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ShopComponent} from './shop/shop.component';
import {ShopErrorComponent} from './shop-error/shop-error.component';
import {StoreComponent} from './store/store.component';
import {CatalogComponent} from './catalog/catalog.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {FindProductsComponent} from './find-products/find-products.component';
import {FindSupplierProductsComponent} from "./find-supplier-products/find-supplier-products.component";
import {CatalogAddProductComponent} from './catalog-add-product/catalog-add-product.component';
import {CatalogEditProductComponent} from './catalog-edit-product/catalog-edit-product.component';
import {FindProductsAddProductComponent} from './find-products-add-product/find-products-add-product.component';
import {FindProductsEditPreviewComponent} from './find-products-edit-preview/find-products-edit-preview.component';
import {StorePreviewComponent} from './store-preview/store-preview.component';
import {StoreEditComponent} from './store-edit/store-edit.component';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {ProductCategoryComponent} from './product-category/product-category.component';
import {StoreFrontComponent} from './store-front/store-front.component';
import {AccountBalanceComponent} from "./account-balance/account-balance.component";
import {AccountPaymentSettingComponent} from "./account-payment-setting/account-payment-setting.component";
import {AccountReportComponent} from  "./account-report/account-report.component";
import { AccountBalancePendingComponent } from "./account-balance-pending/account-balance-pending.component";

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
                path: '',
                loadChildren: 'app/shop/store-edit-2/store-template-2.module#StoreTemplateTwoModule'
              },
              {
                path: '',
                loadChildren: 'app/shop/store-edit-3/store-template-3.module#StoreTemplateThreeModule'
              },
              {
                path: '',
                loadChildren: 'app/shop/store-edit-4/store-template-4.module#StoreTemplateFourModule'
              },
              {
                path: '',
                loadChildren: 'app/shop/store-edit-5/store-template-5.module#StoreTemplateFiveModule'
              },
              {
                path: '',
                loadChildren: 'app/shop/store-edit-6/store-template-6.module#StoreTemplateSixModule'
              }
            ]
          }]
      }, {
        path: 'dashboard', component: DashboardComponent
      }, {
        path: 'settings', component: SettingsComponent
      }, {
        path: 'listings',
        children: [{
          path: 'products', component: CatalogComponent,
          children: [{
            path: 'create', component: CatalogAddProductComponent
          }, {
            path: ':id/edit', component: CatalogEditProductComponent
          }]
        }, {
          path: 'categories', component: ProductCategoryComponent
        }, {
          path: 'items', component: FindProductsComponent,
          children: [{
            path: ':id', component: FindProductsAddProductComponent
          }, {
            path: ':id/preview', component: FindProductsEditPreviewComponent,
          }]
        }, {
          path: 'items/supplier/:supplierId', component: FindSupplierProductsComponent,
          children: [{
            path: ':id', component: FindProductsAddProductComponent
          }, {
            path: ':id/preview', component: FindProductsEditPreviewComponent,
          }]
        }]
      }, {
        path: 'blog',
        loadChildren: 'app/shop/blog/blog.module#BlogModule'
      },
      {
        path: 'account',
        children: [{
          path: '', component: AccountBalanceComponent
        }, {
          path: 'pendingbalance', component: AccountBalancePendingComponent
        }]
      },{
        path: 'report', component: AccountReportComponent
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
