import { NgModule } from '@angular/core';
import { ReviewsDetailComponent } from './reviews-detail/reviews-detail.component';
import { ReviewsRoutingModule } from './reviews.routes.module';
import { ReviewsService } from './reviews.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    ReviewsRoutingModule
  ],
  exports: [],
  declarations: [
    ReviewsDetailComponent
  ],
  providers: [
    ReviewsService
  ]
})
export class ReviewsModule { }

