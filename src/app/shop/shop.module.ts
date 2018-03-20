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
import { StatisticItemComponent } from './statistic-item/statistic-item.component';
import { StatisticTitleComponent } from './statistic-title/statistic-title.component';

import { SnackBarSuccessComponent } from './snack-bar-success/snack-bar-success.component';
import { StoreShareDialogComponent } from "./store-share-dialog/store-share-dialog.component";
import { SettingsPasswordDialogComponent } from "./setting-password-dialog/setting-password-dialog.component";
import { StoreStatusChangeDialogComponent } from "./store-status-change-dialog/store-status-change-dialog.component";

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
    StatisticItemComponent,
    StatisticTitleComponent,
    StoreShareDialogComponent,
    SnackBarSuccessComponent,
    SettingsPasswordDialogComponent,
    ShopErrorComponent,
    StoreAvatarComponent,
    StoreStatusChangeDialogComponent
  ],
  entryComponents: [
    StoreShareDialogComponent,
    SnackBarSuccessComponent,
    SettingsPasswordDialogComponent,
    StoreStatusChangeDialogComponent
  ],
  providers: [
    ShopService,
    StoreService,
    AuthenticationService
  ]
})
export class ShopModule { }

