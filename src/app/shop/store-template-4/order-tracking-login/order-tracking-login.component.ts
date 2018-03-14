import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-tracking-login',
  templateUrl: './order-tracking-login.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class OrderTrackingLoginComponent{

  loginGroup : FormGroup;
  loginErr : any = false;

  constructor(
  ) {
  }

  login() {
    if(this.loginGroup.invalid) {
      return;
    }
    let order = this.loginGroup.value;
    let self = this;
  }

}
