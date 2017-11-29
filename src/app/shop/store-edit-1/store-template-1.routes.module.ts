import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { StoreEditComponent } from './store-edit-1.component';

const routes: Routes = [{
  path: '', component: StoreEditComponent
}, {
  path: '',
  redirectTo: ''
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class StoreTemplateOneRoutingModule{ }
