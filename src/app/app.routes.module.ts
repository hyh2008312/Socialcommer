import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { AnswerDetailComponent } from './questions/answer-detail/answer-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'answer/:id', component: AnswerDetailComponent }
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{ }
