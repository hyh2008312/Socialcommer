import { NgModule } from '@angular/core';
import { BlogsDetailComponent } from './blogs-detail/blogs-detail.component';
import { BlogsRoutingModule } from './blogs.routes.module';
import { BlogsService } from './blogs.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BlogsRoutingModule
  ],
  exports: [],
  declarations: [
    BlogsDetailComponent
  ],
  providers: [
    BlogsService
  ]
})
export class BlogsModule { }

