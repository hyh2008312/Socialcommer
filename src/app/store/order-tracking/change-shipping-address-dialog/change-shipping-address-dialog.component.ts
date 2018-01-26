import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantService } from  '../../../shared/services/constant/constant.service';

import { OrderTrackingService } from '../order-tracking.service';

@Component({
  selector: 'app-order-change-shipping-address-dialog',
  templateUrl: './change-shipping-address-dialog.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class ChangeShippingAddressDialogComponent implements OnInit {

  shippingForm : FormGroup;
  countries:any;
  states: any;

  modified: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ChangeShippingAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private constantService: ConstantService
  ) {
    this.shippingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      code: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.countries = this.constantService.getCountries();
    this.states = this.constantService.getCountries();
  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

}
