import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: '/cp/login', pathMatch: 'full' },
      { path: 'answer', loadChildren: 'app/questions/question.module#QuestionModule', },
      { path: 'review', loadChildren: 'app/reviews/reviews.module#ReviewsModule'},
      { path: 'blog', loadChildren: 'app/blogs/blogs.module#BlogsModule'},
      { path: 'cp', loadChildren: 'app/login/login.module#LoginModule'},
      { path: 'shop', loadChildren: 'app/shop/shop.module#ShopModule'}
    ]
  }
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{ }
