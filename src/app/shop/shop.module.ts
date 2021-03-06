import { NgModule } from '@angular/core';
import { ShopComponent } from './shop/shop.component';
import { ShopErrorComponent } from './shop-error/shop-error.component';
import { StoreComponent } from './store/store.component';
import { SettingsComponent } from "./settings/settings.component";
import { StorePreviewComponent } from "./store-preview/store-preview.component";
import { StoreEditComponent } from "./store-edit/store-edit.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";
import { StoreFrontComponent } from "./store-front/store-front.component";

import { LeftSideNavigationComponent } from "./left-side-navigation/left-side-navigation.component";

import { SnackBarSuccessComponent } from './snack-bar-success/snack-bar-success.component';
import { StoreShareDialogComponent } from "./store-share-dialog/store-share-dialog.component";
import { SettingsPasswordDialogComponent } from "./setting-password-dialog/setting-password-dialog.component";
import { StoreStatusChangeDialogComponent } from "./store-status-change-dialog/store-status-change-dialog.component";
import { StoreGuideBonusDialogComponent } from "./store-guide-bonus-dialog/store-guide-bonus-dialog.component";
import { StoreToRewardDialogComponent } from "./store-to-reward-dialog/store-to-reward-dialog.component";

import { StoreAvatarComponent } from "./store-avatar/store-avatar.component";

import { ShopRoutingModule } from './shop.routes.module';

import { ShopService } from './shop.service';
import { StoreService } from './store.service';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    ShopRoutingModule
  ],
  exports: [],
  declarations: [
    ShopComponent,
    StoreComponent,
    ToDoListComponent,
    SettingsComponent,
    LeftSideNavigationComponent,
    StorePreviewComponent,
    StoreEditComponent,
    StoreFrontComponent,
    StoreShareDialogComponent,
    SnackBarSuccessComponent,
    SettingsPasswordDialogComponent,
    ShopErrorComponent,
    StoreAvatarComponent,
    StoreStatusChangeDialogComponent,
    StoreGuideBonusDialogComponent,
    StoreToRewardDialogComponent
  ],
  entryComponents: [
    StoreShareDialogComponent,
    SnackBarSuccessComponent,
    SettingsPasswordDialogComponent,
    StoreStatusChangeDialogComponent,
    StoreGuideBonusDialogComponent,
    StoreToRewardDialogComponent
  ],
  providers: [
    ShopService,
    StoreService,
    AuthenticationService
  ]
})
export class ShopModule { }

