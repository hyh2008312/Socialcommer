import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-bonus-tips-dialog',
  templateUrl: './bonus-tips-dialog.component.html',
  styleUrls: ['./bonus-tips-dialog.scss']
})

export class BonusTipsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BonusTipsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }


}
