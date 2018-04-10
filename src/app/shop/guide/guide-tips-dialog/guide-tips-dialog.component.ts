import {Component, Inject, OnInit} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-shop-guide-tips-dialog',
  templateUrl: './guide-tips-dialog.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideTipsDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<GuideTipsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {


  }

  close():void {
    this.dialogRef.close();
  }


}
