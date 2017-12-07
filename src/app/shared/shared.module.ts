import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule }    from '@angular/flex-layout';
import { MomentModule }        from 'angular2-moment';

import { SafeHtmlPipe }         from './pipes/safe-html/safe-html.pipe';
import { SafeUrlPipe }         from './pipes/safe-url/safe-url.pipe';
import { SaleDiscountPipe }         from './pipes/sale-discount/sale-discount.pipe';
import { FormatCurrencyPipe }         from './pipes/format-currency/format-currency.pipe';

import { ViewResizeDirective }  from './directives/view-resize/view-resize.directive';
import { ViewScrollDirective }  from './directives/view-srcoll/view-scroll.directive';
import { ViewObjectScrollDirective }  from './directives/view-object-srcoll/view-object-scroll.directive';
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
import { ImageUploadPreviewBlogComponent } from './components/image-upload-preview-blog/image-upload-preview-blog.component';
import { ImagePreviewLoadingComponent } from './components/image-preview-loading/image-preview-loading.component';
import { LeftProductsImageComponent } from './components/left-products-image/left-products-image.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';
import { ShareButtonRowComponent } from './components/share-button-row/share-button-row.component';
import { StoreNavigationComponent } from './components/store-navigation/store-navigation.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { BottomFooterComponent } from './components/bottom-footer/bottom-footer.component';

import { FollowService } from './components/user-follow/user-follow.service';
import { ArticlesDetailHeaderService } from './components/articles-detail-header/articles-detail-header.service';
import { ImageUploadPreviewService } from './components/image-upload-preview/image-upload-preview.service';
import { ConstantService } from './services/constant/constant.service';
import { S3UploaderService } from './services/s3-upload/s3-upload.service';

import { QuillEditorModule } from 'ngx-quill-editor';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from './components/angular4-carousel/index';

import { LoginDialogComponent } from '../login/login/login-dialog.component';
import { SignUpDialogComponent } from '../login/sign-up/sign-up-dialog.component';
import { ResetPasswordComponent } from '../login/reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from '../login/reset-password-confirm/reset-password-confirm.component';
import { InviteCodeComponent } from "../login/invite-code/invite-code.component";

import { LoginService } from '../login/login.service';

import { Angular2SocialLoginModule } from "angular2-social-login";

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
  MatCheckboxModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSidenavModule
} from '@angular/material';


import { GoogleClientId, FacebookClientId } from '../config/app.api';
import {ImageUploadPreviewTwoTemplateComponent} from './components/image-upload-preview-two-template/image-upload-preview-two-template.component';

let providers = {
  "google": {
    "clientId": GoogleClientId
  },
  "facebook": {
    "clientId": FacebookClientId,
    "apiVersion": "v2.10"
  }
};

@NgModule({
  imports: [
    RouterModule,
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
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    Angular2SocialLoginModule,
    MatSidenavModule
  ],
  declarations: [
    SafeHtmlPipe,
    SaleDiscountPipe,
    SafeUrlPipe,
    FormatCurrencyPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    ViewObjectScrollDirective,
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
    ImagePreviewLoadingComponent,
    ImageUploadPreviewBlogComponent,
    LeftProductsImageComponent,
    ShareButtonComponent,
    StoreNavigationComponent,
    ShareButtonRowComponent,
    NavigationHeaderComponent,
    BottomFooterComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    InviteCodeComponent,
    ImageUploadPreviewTwoTemplateComponent


  ],
  exports: [
    SafeHtmlPipe,
    SaleDiscountPipe,
    SafeUrlPipe,
    FormatCurrencyPipe,
    ViewResizeDirective,
    ViewScrollDirective,
    ViewObjectScrollDirective,
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
    ImagePreviewLoadingComponent,
    ImageUploadPreviewBlogComponent,
    ImageUploadPreviewTwoTemplateComponent,
    LeftProductsImageComponent,
    ShareButtonComponent,
    StoreNavigationComponent,
    ShareButtonRowComponent,
    NavigationHeaderComponent,
    BottomFooterComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    InviteCodeComponent,
    CommonModule,
    RouterModule,
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
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSidenavModule
  ],
  providers: [
    FollowService,
    ArticlesDetailHeaderService,
    ImageUploadPreviewService,
    ConstantService,
    S3UploaderService,
    LoginService
  ],
  entryComponents: [
    LoginDialogComponent,
    SignUpDialogComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    InviteCodeComponent
  ]
})
export class SharedModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
