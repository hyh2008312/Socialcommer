import { NgModule } from '@angular/core';

import { BlogMainComponent } from "./blog-main/blog-main.component";
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogTitleComponent } from './blog-title/blog-title.component';
import { BlogCreateDialogComponent } from "./blog-create-dialog/blog-create-dialog.component";
import { BlogEditDialogComponent } from "./blog-edit-dialog/blog-edit-dialog.component";
import { BlogDeleteDialogComponent } from "./blog-delete-dialog/blog-delete-dialog.component";

import {BlogRoutingModule} from './blog.routes.module';

import { BlogService } from './blog.service';


import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    BlogRoutingModule
  ],
  exports: [],
  declarations: [
    BlogMainComponent,
    BlogTitleComponent,
    BlogItemComponent,
    BlogCreateDialogComponent,
    BlogEditDialogComponent,
    BlogDeleteDialogComponent
  ],
  entryComponents: [
    BlogDeleteDialogComponent
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }

