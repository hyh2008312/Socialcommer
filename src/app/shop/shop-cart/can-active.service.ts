import { Injectable } from '@angular/core';
import { CanActivate , Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanActive implements CanActivate {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  getOrder(): any {
    if(localStorage && localStorage.getItem('order')) {
      return JSON.parse(localStorage.getItem('order'));
    }
    return {};
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (JSON.stringify(this.getOrder()) == '{}') {
      let cart = state.url.split('/cart')[0];
      this.router.navigate([cart]);
      return false;
    }
    return true;
  }


}
