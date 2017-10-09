import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { FlexLayoutModule }    from '@angular/flex-layout';
import { MomentModule }        from 'angular2-moment';

import { SafeHtmlPipe }         from './pipes/safe-html/safe-html.pipe';
import { ViewResizeDirective }  from './directives/view-resize/view-resize.directive';
import { ViewScrollDirective }  from './directives/view-srcoll/view-scroll.directive';

import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { UserBadgeComponent } from './components/user-badge/user-badge.component';
import { UserFollowComponent } from './components/user-follow/user-follow.component';
import { ScorePointsComponent } from './components/score-points/score-points.component';
import { ArticlesDetailHeaderComponent } from './components/articles-detail-header/articles-detail-header.component';

import { FollowService } from './components/user-follow/user-follow.service';
import { ArticlesDetailHeaderService } from './components/articles-detail-header/articles-detail-header.service';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  declarations: [
    SafeHtmlPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    UserAvatarComponent,
    UserBadgeComponent,
    UserFollowComponent,
    ScorePointsComponent,
    ArticlesDetailHeaderComponent
  ],
  exports: [
    SafeHtmlPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    UserAvatarComponent,
    UserBadgeComponent,
    UserFollowComponent,
    ScorePointsComponent,
    ArticlesDetailHeaderComponent,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MomentModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [
    FollowService,
    ArticlesDetailHeaderService
  ]
})
export class SharedModule { }
