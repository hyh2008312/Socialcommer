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
    if(localStorage && localStorage.getItem('order-cart')) {
      return JSON.parse(localStorage.getItem('order-cart'));
    }
    return {};
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (JSON.stringify(this.getOrder()) == '{}') {
      this.router.navigate(['/shop/cart']);
      return false;
    }
    return true;
  }


}
