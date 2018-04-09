import {Component, Inject, OnInit} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { GuideService } from '../guide.service';
import { UserService } from '../../../shared/services/user/user.service';


@Component({
  selector: 'app-shop-guide-product-dialog',
  templateUrl: './guide-product-dialog.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideProductDialogComponent implements OnInit {


  array: any = [];

  constructor(
    private guideService: GuideService,
    private userService: UserService,
    public dialogRef: MatDialogRef<GuideProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    for(let i = 0; i < 30; i++) {
      this.array.push(1);
    }
  }

  ngOnInit():void {
    let self = this;

  }

  close():void {
    this.dialogRef.close();
  }

}
