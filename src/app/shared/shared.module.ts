import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

import { FlexLayoutModule }    from '@angular/flex-layout';
import { MomentModule }        from 'angular2-moment';

import { SafeHtmlPipe }         from './pipes/safe-html/safe-html.pipe';

import { ViewResizeDirective }  from './directives/view-resize/view-resize.directive';
import { ViewScrollDirective }  from './directives/view-srcoll/view-scroll.directive';
import { RepeatOrderDirective }  from './directives/repeat-order/repeat-order.directive';
import { SocialShareDirective }  from './directives/social-share/social-share.directive';
import { ValidateEqualDirective }  from './directives/validate-equal/validate-equal.directive';

import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { UserBadgeComponent } from './components/user-badge/user-badge.component';
import { UserFollowComponent } from './components/user-follow/user-follow.component';
import { ScorePointsComponent } from './components/score-points/score-points.component';
import { ArticlesDetailHeaderComponent } from './components/articles-detail-header/articles-detail-header.component';
import { ImageUploadPreviewComponent } from './components/image-upload-preview/image-upload-preview.component';
import { ImageUploadPreviewMultiComponent } from './components/image-upload-preview-multi/image-upload-preview-multi.component';
import { ImagePreviewMultiComponent } from './components/image-preview-multi/image-preview-multi.component';
import { ImageUploadHeaderComponent } from './components/image-upload-header/image-upload-header.component';
import { LeftProductsImageComponent } from './components/left-products-image/left-products-image.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';

import { FollowService } from './components/user-follow/user-follow.service';
import { ArticlesDetailHeaderService } from './components/articles-detail-header/articles-detail-header.service';
import { ImageUploadPreviewService } from './components/image-upload-preview/image-upload-preview.service';
import { ConstantService } from './services/constant/constant.service';

import { QuillEditorModule } from 'ngx-quill-editor';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from './components/angular4-carousel/index';


import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTabsModule,
  MatDialogModule,
  MatChipsModule,
  MatIconModule,
  MatSortModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillEditorModule,
    AngularCropperjsModule,
    CarouselModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  declarations: [
    SafeHtmlPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    RepeatOrderDirective,
    SocialShareDirective,
    ValidateEqualDirective,
    UserAvatarComponent,
    UserBadgeComponent,
    UserFollowComponent,
    ScorePointsComponent,
    ArticlesDetailHeaderComponent,
    ImageUploadPreviewComponent,
    ImageUploadPreviewMultiComponent,
    ImagePreviewMultiComponent,
    ImageUploadHeaderComponent,
    LeftProductsImageComponent,
    ShareButtonComponent
  ],
  exports: [
    SafeHtmlPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    RepeatOrderDirective,
    SocialShareDirective,
    ValidateEqualDirective,
    UserAvatarComponent,
    UserBadgeComponent,
    UserFollowComponent,
    ScorePointsComponent,
    ArticlesDetailHeaderComponent,
    ImageUploadPreviewComponent,
    ImageUploadPreviewMultiComponent,
    ImagePreviewMultiComponent,
    ImageUploadHeaderComponent,
    LeftProductsImageComponent,
    ShareButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    QuillEditorModule,
    AngularCropperjsModule,
    MomentModule,
    CarouselModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatSortModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [
    FollowService,
    ArticlesDetailHeaderService,
    ImageUploadPreviewService,
    ConstantService
  ]
})
export class SharedModule { }
