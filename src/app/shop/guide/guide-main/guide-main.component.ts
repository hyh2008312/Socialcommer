import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuideService } from '../guide.service';
import { UserService } from '../../../shared/services/user/user.service';
import { MatDialog } from "@angular/material";

import { GuideProductDialogComponent } from '../guide-product-dialog/guide-product-dialog.component';
import { GuideTipsDialogComponent } from '../guide-tips-dialog/guide-tips-dialog.component';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-shop-guide-main',
  templateUrl: './guide-main.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideMainComponent implements OnInit {

  loading: boolean = false;
  sub: any;
  sub1: any;
  sub2: any;
  approveStatus: any;
  step: number = 0;

  currency: string = 'USD';

  selectErr: boolean = false;

  productArr: any = [];

  constructor(
    private guideService: GuideService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.sub = this.router.events.subscribe((s) => {
      if(s instanceof NavigationStart) {
        if(s.url.split('guide')[0] != null) {
          this.loading = true;
        }
      }
      if(s instanceof NavigationEnd) {
        this.loading = false;
      }
    });

    this.sub1 = this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = this.currency.toUpperCase();
        switch(data.setStep) {
          case 'first':
            this.step = 0;
            this.productList();
            break;
          case 'second':
            this.step = 1;
            break;
          case 'finished':
            if(data.setStoreBonus) {
              this.step = 2;
              //this.router.navigate(['/shop/listings/items'], {replaceUrl: true});
            } else {
              this.step = 2;
            }
            break;
        }
      }
    });

    this.sub2 = this.userService.currentUser.subscribe((data) => {
      if(data) {
        this.approveStatus = data.status;
      }
    });
  }

  nextStep() {
    let self = this;

    if(!this.isCategorySelectedEnough()) {
      self.selectErr = true;
      return;
    }

    let step: string = '';
    if(self.step == 0) {
      step = 'second';
    }

    self.guideService.changeGuideStep({
      step
    }).then((data) => {
      self.step = 1;
      self.userService.addStore(data);
    });

  }

  isCategorySelectedEnough() {
    let number: number = 0;
    for(let i = 0; i< this.productArr.length;i++) {
      if(this.productArr[i].type == 'goods') {
        number++;
      }
    }
    if(number >= 3) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit():void {

  }

  productList() {
    this.guideService.getProductList().then((data) => {
      this.productArr = data;
    });
  }

  openGuideProducts(index) {
    let dialogRef = this.dialog.open(GuideProductDialogComponent, {
      data: {
        productList: this.productArr[index]
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(!self.productArr[index].addProducts) {
        self.productArr[index].addProducts = [...dialogRef.componentInstance.data.productList.addProducts];
      }
    });
  }


  openTipsDialog() {
    let dialogRef = this.dialog.open(GuideTipsDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
    if(this.sub1) {
      this.sub1.unsubscribe();
    }
    if(this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  close() {
    this.loading = false;
  }

  productListChange($event) {
    if($event.status == 'edit') {
      this.productArr[$event.index] = $event.data;
    }
  }

  addToSell(item, index) {
    let self = this;
    if(item.type == 'product') {
      self.guideService.addCategoryProductList({
        id: item.id
      }).then((data) => {
        self.productArr[index] = data;
      });
    } else {
      self.guideService.deleteCategoryProductList({
        id: item.id
      }).then((data) => {
        self.productArr[index] = data;
      });
    }
  }

}
