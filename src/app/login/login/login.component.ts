import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.scss']
})

export class LoginComponent implements OnInit {

  loginGroup : FormGroup;

  loginErr : any = false;

  constructor(
    private router: Router,
    private service: LoginService,
    private fb: FormBuilder,
    private auth: AuthenticationService
  ) {
    this.loginGroup = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]]
    });
  }

  ngOnInit():void {
  }

  login() {
    if(!this.loginGroup.valid) {
      return;
    }

    let self = this;
    self.service.login(this.loginGroup.value).then((data) => {
      self.loginErr = false;
      this.auth.setAccessToken(data);
      //this.router.navigateByUrl('shop/1/dashboard');
    }).catch((data) => {
      self.loginErr = data;
    });

  }
}
