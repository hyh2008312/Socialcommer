import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../login.scss']
})

export class SignUpComponent implements OnInit {

  signUpGroup : FormGroup;

  step: number = 0;

  country: string;

  public countries: Object[];

  currency: string;

  public signUpErr: any = false;

  currencies = [{
    code: 'INR',
    value: 'INR'
  },{
    code: 'USD',
    value: 'USD'
  }];

  constructor(
    private router : Router,
    private service: LoginService,
    private fb: FormBuilder,
    private constant: ConstantService
  ) {
    this.signUpGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]]
    });

    this.countries = this.constant.getCountries();

  }

  ngOnInit():void {}

  signUp() {
    if(!this.signUpGroup.valid) {
      return;
    }

    let self = this;
    self.service.signUp(this.signUpGroup.value).then((data) => {
      self.signUpErr = false;
      self.step = 1;
    }).catch((data) => {
      self.signUpErr = data;
    });
  }

  complete() {
    this.step = 2;
    this.router.navigateByUrl('shop/1/store');
  }

  ngOnDestroy(){

  }

}
