import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { BlogsDetailComponent } from './blogs-detail/blogs-detail.component';

const routes: Routes = [
  { path: ':id', component: BlogsDetailComponent }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class BlogsRoutingModule{ }
