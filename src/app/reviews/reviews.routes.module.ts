import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { ReviewsDetailComponent } from './reviews-detail/reviews-detail.component';

const routes: Routes = [
  { path: ':id', component: ReviewsDetailComponent }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ReviewsRoutingModule{ }
