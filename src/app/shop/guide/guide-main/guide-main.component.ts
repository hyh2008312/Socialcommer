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
  }

  ngOnInit():void {
    let self = this;

  }

  openGuideProducts() {
    let dialogRef = this.dialog.open(GuideProductDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

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
    this.sub.unsubscribe();
  }

  close() {
    this.loading = false;
  }

}
