import { NgModule } from '@angular/core';

import { RewardMainComponent } from './reward-main/reward-main.component';
import { RewardItemComponent } from "./reward-item/reward-item.component";

import { RewardRoutingModule } from './reward.routes.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RewardRoutingModule
  ],
  exports: [],
  declarations: [
    RewardMainComponent,
    RewardItemComponent
  ],
  providers: []
})
export class RewardModule { }

