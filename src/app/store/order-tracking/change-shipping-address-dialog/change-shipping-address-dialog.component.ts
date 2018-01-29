import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private orderTrackingService: OrderTrackingService
  ) {

    this.orderTrackingService.getCountryList().then((data) => {
      this.countries = data;
    });
    this.shippingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      city: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      postcode: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });

    if(this.data.order.shippingAddress) {
      this.shippingForm.patchValue({
        firstName: this.data.order.shippingAddress.firstName,
        lastName: this.data.order.shippingAddress.lastName,
        line1: this.data.order.shippingAddress.line1,
        line2: this.data.order.shippingAddress.line2,
        city: this.data.order.shippingAddress.city,
        countryId: this.data.order.shippingAddress.country.id,
        stateId: this.data.order.shippingAddress.state.id,
        postcode: this.data.order.shippingAddress.postcode,
        phoneNumber: this.data.order.shippingAddress.phoneNumber,
      });
      this.changeShippingState(this.data.order.shippingAddress.country.id);
    }
  }

  ngOnInit():void {

  }

  changeShippingState($event) {
    let cid = $event;
    this.orderTrackingService.getStateList({
      cid
    }).then((data)=> {
      this.states = data;
    });
  }

  close():void {
    this.dialogRef.close();
  }

  changeAddress() {
    if(this.shippingForm.invalid) {
      return;
    }
    let order = this.shippingForm.value;
    order.id = this.data.order.id;
    order.email = this.data.email;
    order.number = this.data.number;

    let self = this;
    self.orderTrackingService.changeAddress(order).then((data) => {
      self.data.isAddressChange = true;
      self.data.order = data;
    });
  }

}
