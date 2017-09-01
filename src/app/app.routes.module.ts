import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'answer', loadChildren: 'app/questions/question.module#QuestionModule', },
  { path: 'review', loadChildren: 'app/reviews/reviews.module#ReviewsModule'},
  { path: 'blog', loadChildren: 'app/blogs/blogs.module#BlogsModule'}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{ }
