import { NgModule } from '@angular/core';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';
import { QuestionRoutingModule } from './question.routes.module';
import { QuestionsService } from './questions.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    QuestionRoutingModule
  ],
  exports: [],
  declarations: [
    AnswerDetailComponent
  ],
  providers: [
    QuestionsService
  ]
})
export class QuestionModule { }

