import { NgModule } from '@angular/core';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';
import { QuestionRoutingModule } from './question.routes.module';
import { QuestionsService } from './questions.service';

import { SharedModule } from '../shared/shared.module';

import { UserAvatarComponent } from '../components/user-avatar/user-avatar.component';
import { UserBadgeComponent } from '../components/user-badge/user-badge.component';
import { UserFollowComponent } from '../components/user-follow/user-follow.component';

@NgModule({
  imports: [
    SharedModule,
    QuestionRoutingModule
  ],
  exports: [

  ],
  declarations: [
    AnswerDetailComponent,
    UserAvatarComponent,
    UserBadgeComponent,
    UserFollowComponent,
  ],
  providers: [
    QuestionsService
  ]
})
export class QuestionModule { }

