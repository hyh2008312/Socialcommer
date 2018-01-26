import { Injectable } from '@angular/core';
import { CanActivate , Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { OrderTrackingService } from './order-tracking.service';

@Injectable()
export class CanActive implements CanActivate {

  constructor(
    private router: Router,
    private orderTrackingService: OrderTrackingService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.orderTrackingService.order.asObservable().map((data) => {
      if(data) {
        return true;
      } else {
        let order = state.url.split('/order')[0];
        this.router.navigate([order + '/order']);
        return false;
      }
    });
  }

}
