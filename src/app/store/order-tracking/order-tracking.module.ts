import { NgModule } from '@angular/core';

import { StoreCartHeaderComponent } from './store-cart-header/store-cart-header.component';
import { StoreCartFooterComponent } from './store-cart-footer/store-cart-footer.component';
import { OrderDetailItemComponent } from './order-detail-item/order-detail-item.component';
import { OrderDetailTitleComponent } from './order-detail-title/order-detail-title.component';
import { AttachmentUploadComponent } from './attachment-upload/attachment-upload.component';
import { AttachmentPreviewComponent } from './attachment-preview/attachment-preview.component';

import { OrderTrackingLoginComponent } from './order-tracking-login/order-tracking-login.component';
import { ViewYourOrderComponent } from './view-your-order/view-your-order.component';
import { ReturnProgressComponent } from './return-progress/return-progress.component';


import { ForgetOrderNumberDialogComponent } from './forget-order-number-dialog/forget-order-number-dialog.component';
import { ChangeShippingAddressDialogComponent } from './change-shipping-address-dialog/change-shipping-address-dialog.component';
import { CancelItemDialogComponent } from './cancel-item-dialog/cancel-item-dialog.component';
import { TrackingInformationDialogComponent } from './tracking-information-dialog/tracking-information-dialog.component';
import { ReturnRequestDialogComponent } from './return-request-dialog/return-request-dialog.component';

import { OrderTrackingRoutingModule } from './order-tracking.routes.module';

import { OrderTrackingService } from './order-tracking.service';
import { CanActive } from './can-active.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    OrderTrackingRoutingModule
  ],
  exports: [

  ],
  declarations: [
    StoreCartHeaderComponent,
    StoreCartFooterComponent,
    OrderTrackingLoginComponent,
    ForgetOrderNumberDialogComponent,
    ViewYourOrderComponent,
    OrderDetailItemComponent,
    OrderDetailTitleComponent,
    ChangeShippingAddressDialogComponent,
    CancelItemDialogComponent,
    TrackingInformationDialogComponent,
    AttachmentUploadComponent,
    ReturnRequestDialogComponent,
    AttachmentPreviewComponent,
    ReturnProgressComponent
  ],
  entryComponents: [
    ForgetOrderNumberDialogComponent,
    ChangeShippingAddressDialogComponent,
    CancelItemDialogComponent,
    TrackingInformationDialogComponent,
    ReturnRequestDialogComponent
  ],
  providers: [
    OrderTrackingService,
    CanActive
  ]
})
export class OrderTrackingModule { }

