import { NgModule } from '@angular/core';

import { GuideMainComponent } from './guide-main/guide-main.component';
import { GuideProductItemComponent } from './guide-product-item/guide-product-item.component';
import { GuideProductListComponent } from './guide-product-list/guide-product-list.component';
import { GuideProductDialogComponent } from './guide-product-dialog/guide-product-dialog.component';
import { GuideProductDialogItemComponent } from './guide-product-dialog-item/guide-product-dialog-item.component';

import { GuideRoutingModule } from './guide.routes.module';

import { GuideService } from './guide.service';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    GuideRoutingModule
  ],
  exports: [],
  declarations: [
    GuideMainComponent,
    GuideProductItemComponent,
    GuideProductListComponent,
    GuideProductDialogItemComponent,
    GuideProductDialogComponent
  ],
  entryComponents: [
    GuideProductDialogComponent
  ],
  providers: [
    GuideService
  ]
})
export class GuideModule { }

