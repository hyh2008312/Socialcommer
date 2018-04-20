import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from "../../../shared/services/user/user.service";

@Component({
  selector: 'app-shop-error-dialog',
  templateUrl: './shop-error-dialog.component.html',
  styleUrls: ['../_shop-cart.scss']
})

export class ShopErrorDialogComponent implements OnInit{

  displayName: any = '';

  constructor(
    public dialogRef: MatDialogRef<ShopErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.store.subscribe((data) => {
      if(data) {
        this.displayName = data.displayName;
      }
    });
  }

  ngOnInit() {}

  close():void {
    this.router.navigate([`/store/${this.displayName}/cart`]).then(() => {
      this.dialogRef.close();
    });
  }

}
