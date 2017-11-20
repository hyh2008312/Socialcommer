import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { StoreMainComponent } from './store-main/store-main.component';


const routes: Routes = [{
  path: '', component: StoreMainComponent,
  children: [{
     path: ':name',
     loadChildren: 'app/store/store-template-1/store-template-1.module#StoreTemplateOneModule'
  }, {
    path: ':name',
    loadChildren: 'app/store/store-template-3/store-template-3.module#StoreTemplateThreeModule'
  }]
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreRoutingModule{ }
