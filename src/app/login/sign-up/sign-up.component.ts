import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../login.scss']
})

export class SignUpComponent implements OnInit {

  step: number = 0;

  country: string;

  countries = [{
    code: 'IN',
    value: 'INDIA'
  },{
    code: 'US',
    value: 'US'
  }];

  currency: string;

  currencies = [{
    code: 'INR',
    value: 'INR'
  },{
    code: 'USD',
    value: 'USD'
  }];

  constructor(
    private router: Router
  ) { }

  ngOnInit():void {
  }

  signUp() {
    this.step = 1;
  }

  complete() {
    this.step = 2;
    this.router.navigateByUrl('shop/1/store');
  }

}
