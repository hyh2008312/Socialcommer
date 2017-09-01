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

import { FollowService } from './components/user-follow/user-follow.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SafeHtmlPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    UserAvatarComponent,
    UserBadgeComponent,
    UserFollowComponent
  ],
  exports: [
    SafeHtmlPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    UserAvatarComponent,
    UserBadgeComponent,
    UserFollowComponent,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MomentModule
  ],
  providers: [
    FollowService
  ]
})
export class SharedModule { }
