import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StoreService } from './store.service';
import { Store } from './store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StoreResolverService implements Resolve<Store> {

  constructor(
    private storeService: StoreService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let name = route.params['name'];
    return this.storeService.getStore(name);
  }

}


