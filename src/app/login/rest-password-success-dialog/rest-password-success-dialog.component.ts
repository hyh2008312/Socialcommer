import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rest-password-success-dialog',
  templateUrl: './rest-password-success-dialog.component.html',
  styleUrls: ['../login.scss']
})

export class ResetPasswordSuccessDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {}

  close():void {
    this.dialogRef.close();
  }

}
