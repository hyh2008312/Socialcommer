import { NgModule } from '@angular/core';


import { SharedModule } from '../../shared/shared.module';
import {StoreMessageRoutingModule} from "./store-message.routes.module";
import {StoreMessageService} from "./store-message.service";
import {StoreMessageMainComponent} from "./store-message-main/store-message-main.component";
import {StoreMessageFooterComponent} from "./store-message-footer/store-message-footer.component";
import {StoreMessageHeaderComponent} from "./store-message-header/store-message-header.component";
import {CustomerServiceMessageComponent} from "./customer-service-message/customer-service-message.component";

@NgModule({
  imports: [
    SharedModule,
    StoreMessageRoutingModule
  ],
  exports: [

  ],
  declarations: [
    StoreMessageMainComponent,
    StoreMessageFooterComponent,
    StoreMessageHeaderComponent,
    CustomerServiceMessageComponent
  ],
  entryComponents: [
  ],
  providers: [
    StoreMessageService,
  ]
})
export class StoreMessageModule { }

