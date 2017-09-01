import { NgModule } from '@angular/core';
import { ReviewsDetailComponent } from './reviews-detail/reviews-detail.component';
import { ReviewsRoutingModule } from './reviews.routes.module';
import { ReviewsService } from './reviews.service';

import { SharedModule } from '../shared/shared.module';
import { ScorePointsComponent } from '../shared/components/score-points/score-points.component';
import { ArticlesDetailHeaderComponent } from '../shared/components/articles-detail-header/articles-detail-header.component';


@NgModule({
  imports: [
    SharedModule,
    ReviewsRoutingModule
  ],
  exports: [
    ArticlesDetailHeaderComponent,
    ScorePointsComponent
  ],
  declarations: [
    ArticlesDetailHeaderComponent,
    ScorePointsComponent,
    ReviewsDetailComponent
  ],
  providers: [
    ReviewsService
  ]
})
export class ReviewsModule { }

