import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {ShopService} from '../shop.service';
import {UserService} from '../../shared/services/user/user.service';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

import {StoreGuideBonusDialogComponent} from "../store-guide-bonus-dialog/store-guide-bonus-dialog.component";

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['../shop.scss'],
  animations: [
    trigger('cartState', [
      state('inactive', style({
        display: 'none'
      })),
      transition('inactive => active', animate('500ms 10ms cubic-bezier(1,.5,.45,1)',
        keyframes([
          style({
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: 'translateX(-50%)'
          }),
          style({
            position: 'absolute',
            left: '90%',
            top: '16px',
            transform: 'translateX(-50%)',
            display: 'none'
          }
      )]))),
      transition('active => inactive', animate('0ms linear'))
    ])
  ]
})

export class ShopComponent implements OnInit {

  avatar: any = false;
  firstName: any = '';
  storeName: any = false;
  currency: string = 'USD';
  shareLink: string = '';
  description: string = 'Welcome to my store: ';
  productNumber: number = 0;

  animationState = 'inactive';

  changeAnimationState(): void {
    this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
  }

  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      if (data) {
        self.avatar = data.avatar;
        self.firstName = data.firstName;
        if(!data.isInvite) {
          self.router.navigate(['/shop/guide'],{replaceUrl: true});
        }
      }
    });

    self.userService.store.subscribe((data) =>  {
      if(data) {
        self.description = self.description + data.name + ' - ' + data.description;
        self.storeName = data.displayName;
        self.currency = data.currency.toUpperCase();
        self.userService.addCartNumber(data);
        if (data.template != null) {
          let templateId = data.template.templateId;
          self.shopService.setTemplateUId(templateId);
        } else {
          self.shopService.setTemplateUId(5);
        }
        self.shopService.getMultiTemplate().then((data) => {
          self.shopService.setTemplateList(data);
        });
        self.shareLink = window.location.host + '/store/' + self.storeName;
        if(!data.setStoreBonus && data.setStep == 'finished' && !(<any>window).isFirstLogin) {
          if(self.router.url != '/shop/guide' && self.router.url != '/account/login') {
            (<any>window).isFirstLogin = true;
            self.openDialog();
          }
        }
      }
    });

    self.userService.cartNumber.subscribe((data) => {
      if(data) {
        self.animationState = 'inactive';
        self.productNumber = data.cartProductNum;
        setTimeout(() => {
          self.animationState = 'active';
        }, 100);
      }
    });
  }

  ngOnInit(): void {
    let self = this;

    self.shopService.getCategoryList().then((data) => {
      self.userService.addUserCategory(data);
    });

    self.shopService.getSupplyCategory().then((data) => {
      self.userService.addPubCategory(data);
    });

    self.shopService.getCountryList().then((data) => {
      self.userService.addCountryList(data);
    });

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/account/login']);
  }

  openDialog() {
    let dialogRef = this.dialog.open(StoreGuideBonusDialogComponent, {
      data: {
        shareLink: 'http://' + this.shareLink ,
        text: this.description
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
