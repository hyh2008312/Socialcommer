import { Component, OnInit } from '@angular/core';

import { GuideService } from '../guide.service';
import { UserService } from '../../../shared/services/user/user.service';
import { MatDialog } from "@angular/material";

import { GuideProductDialogComponent } from '../guide-product-dialog/guide-product-dialog.component';

@Component({
  selector: 'app-shop-guide-main',
  templateUrl: './guide-main.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideMainComponent implements OnInit {


  constructor(
    private guideService: GuideService,
    private userService: UserService,
    public dialog: MatDialog
  ) {

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

}
