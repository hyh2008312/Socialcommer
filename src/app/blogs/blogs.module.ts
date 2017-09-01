import { NgModule } from '@angular/core';
import { BlogsDetailComponent } from './blogs-detail/blogs-detail.component';
import { BlogsRoutingModule } from './blogs.routes.module';
import { BlogsService } from './blogs.service';

import { SharedModule } from '../shared/shared.module';
import { ArticlesDetailHeaderComponent } from '../shared/components/articles-detail-header/articles-detail-header.component';


@NgModule({
  imports: [
    SharedModule,
    BlogsRoutingModule
  ],
  exports: [
    ArticlesDetailHeaderComponent
  ],
  declarations: [
    BlogsDetailComponent,
    ArticlesDetailHeaderComponent
  ],
  providers: [
    BlogsService
  ]
})
export class BlogsModule { }

