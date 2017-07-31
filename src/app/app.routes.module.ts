import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'answer', loadChildren: 'app/questions/question.module#QuestionModule', }
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{ }
