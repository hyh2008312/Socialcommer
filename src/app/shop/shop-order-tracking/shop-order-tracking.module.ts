import { NgModule } from '@angular/core';

import { OrderDetailItemComponent } from './order-detail-item/order-detail-item.component';
import { OrderDetailTitleComponent } from './order-detail-title/order-detail-title.component';
import { OrderListTitleComponent } from './order-list-title/order-list-title.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
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

import { ShopOrderTrackingRoutingModule } from './shop-order-tracking.routes.module';

import { ShopOrderTrackingService } from './shop-order-tracking.service';

import { SharedModule } from '../../shared/shared.module';
import {StoreMessageService} from "./store-message.service";
import {StoreMessageMainComponent} from "./store-message-main/store-message-main.component";
import {CustomerServiceMessageComponent} from "./customer-service-message/customer-service-message.component";

@NgModule({
  imports: [
    SharedModule,
    ShopOrderTrackingRoutingModule
  ],
  exports: [

  ],
  declarations: [
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
    ReturnProgressComponent,
    StoreMessageMainComponent,
    CustomerServiceMessageComponent,
    OrderListTitleComponent,
    OrderListItemComponent
  ],
  entryComponents: [
    ForgetOrderNumberDialogComponent,
    ChangeShippingAddressDialogComponent,
    CancelItemDialogComponent,
    TrackingInformationDialogComponent,
    ReturnRequestDialogComponent
  ],
  providers: [
    ShopOrderTrackingService,
    StoreMessageService
  ]
})
export class ShopOrderTrackingModule { }

