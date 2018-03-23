import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RewardMainComponent} from './reward-main/reward-main.component';

const routes: Routes = [
  {
    path: '', component: RewardMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardRoutingModule {
}
