import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit():void {
  }

  login() {
    this.router.navigateByUrl('shop/1/dashboard');
  }
}
