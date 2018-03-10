import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-error-dialog',
  templateUrl: './store-error-dialog.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreErrorDialogComponent implements OnInit{

  displayName: any = '';

  constructor(
    public dialogRef: MatDialogRef<StoreErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private storeService: StoreService
  ) {
    this.storeService.store.subscribe((data) => {
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
