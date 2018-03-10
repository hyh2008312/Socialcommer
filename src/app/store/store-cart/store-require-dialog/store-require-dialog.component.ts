import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-store-require-dialog',
  templateUrl: './store-require-dialog.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreRequireDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<StoreRequireDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {}

  close():void {
    this.dialogRef.close();
  }

}
