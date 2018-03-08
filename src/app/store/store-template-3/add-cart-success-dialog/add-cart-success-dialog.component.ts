import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-cart-3-dialog',
  templateUrl: './add-cart-success-dialog.component.html',
  styleUrls: ['./_store-cart-success.scss']
})

export class AddCartSuccessDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddCartSuccessDialogComponent>,
              private router:Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

  }

  close(): void {
    this.dialogRef.close();
  }

  jumpCart(): void {
    this.dialogRef.close();
    this.router.navigate([`./store/${this.data.displayName}/cart`]);
  }

}
