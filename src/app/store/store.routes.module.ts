import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    children: [{
      path: ':id', component: StoreDetailComponent
    }]
  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreRoutingModule{ }
