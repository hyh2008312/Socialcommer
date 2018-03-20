import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { BlogMainComponent } from './blog-main/blog-main.component';
import {BlogCreateDialogComponent} from './blog-create-dialog/blog-create-dialog.component';
import {BlogEditDialogComponent} from './blog-edit-dialog/blog-edit-dialog.component';

const routes: Routes = [
  {
    path: '', component: BlogMainComponent,
    children: [{
      path: 'create', component: BlogCreateDialogComponent
    }, {
      path: ':id/edit', component: BlogEditDialogComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
