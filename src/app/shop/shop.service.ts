import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Product } from './shop';

import { BaseApi } from '../config/app.api';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

@Injectable()
export class ShopService {

  constructor( private http: Http, private baseUrl: BaseApi, private auth: AuthenticationService) { }

  createAuthorizationHeader(headers: Headers) {

    headers.append('Authorization', this.auth.getAccessToken() ?
    'Bearer ' + this.auth.getAccessToken(): '');

  }

  createProducts(product:Product): Promise<Product> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}/products/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json() as Product)
      .catch(this.handleError);
  }


  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
