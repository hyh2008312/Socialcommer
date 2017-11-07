import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-store-share-dialog',
  templateUrl: './store-share-dialog.component.html',
  styleUrls: ['../shop.scss']
})

export class StoreShareDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StoreShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
