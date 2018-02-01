import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreMessageMainComponent} from "./store-message-main/store-message-main.component";


const routes: Routes = [{
    path: '', component: StoreMessageMainComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreMessageRoutingModule {
}
