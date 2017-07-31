import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { AnswerDetailComponent } from './answer-detail/answer-detail.component';

const routes: Routes = [
  { path: ':id', component: AnswerDetailComponent }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class QuestionRoutingModule{ }
