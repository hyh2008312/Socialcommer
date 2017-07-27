import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app.routes.module';

import { AppComponent } from './app.component';

import { AnswerDetailComponent } from './questions/answer-detail/answer-detail.component';

import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { UserBadgeComponent } from './components/user-badge/user-badge.component';
import { UserFollowComponent } from './components/user-follow/user-follow.component';

import { ViewResizeDirective } from './directives/view-resize/view-resize.directive';

import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';

import { QuestionsService } from './questions/questions.service';
import { FollowService } from './components/user-follow/user-follow.service';

import { WindowRef } from './provider/window-ref.provider';


@NgModule({
  declarations: [
    AppComponent,
    AnswerDetailComponent,
    UserAvatarComponent,
    UserBadgeComponent,
    UserFollowComponent,
    ViewResizeDirective,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule,
    FlexLayoutModule
  ],
  providers: [QuestionsService,FollowService,WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
