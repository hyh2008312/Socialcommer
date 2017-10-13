import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../login.scss']
})

export class SignUpComponent implements OnInit {

  signUpGroup : FormGroup;

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
    private router: Router,
    private service: LoginService,
    private fb: FormBuilder
  ) {
    this.signUpGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit():void {
  }

  signUp() {
    if(!this.signUpGroup.valid) {
      return;
    }

    this.service.signUp(this.signUpGroup.value).then((data) => {
      console.log(data)
    })
  }

  complete() {
    this.step = 2;
    this.router.navigateByUrl('shop/1/store');
  }

}
