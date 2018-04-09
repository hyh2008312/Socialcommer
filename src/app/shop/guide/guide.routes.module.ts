import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GuideMainComponent } from './guide-main/guide-main.component';

const routes: Routes = [
  {
    path: '', component: GuideMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule {
}
