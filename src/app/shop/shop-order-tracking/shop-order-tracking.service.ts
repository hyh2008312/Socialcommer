import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import{ Subject, BehaviorSubject } from 'rxjs';
import { BaseApi } from '../../config/app.api';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {GuardLinkService} from '../../shared/services/guard-link/guard-link.service';

@Injectable()
export class ShopOrderTrackingService {

  routerLink: any = false;

  order: Subject<any> = new BehaviorSubject<any>(null);

  public addOrder(newOrder: any): void {
    this.order.next(newOrder);
  }

  constructor(
    private http: Http,
    private baseApi: BaseApi,
    private auth: AuthenticationService,
    public guardLinkService: GuardLinkService
  ) { }

  createAuthorizationHeader(headers: Headers) {
    this.auth.getAccessToken().subscribe((data) => {
      if (data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });
  }

  serializeParams(params) {

    let array = [];

    for (const key in params) {
      if(Array.isArray(params[key])) {
        if(params[key].length > 0) {
          let item = params[key].join(',');
          array.push(key + '=' + item);
        }
      } else {
        if(params[key] != undefined) {
          array.push(key + '=' + params[key]);
        }
      }
    }

    return array.join('&');
  }

  getOrderList(params): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/store/list/?${this.serializeParams(params)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getOrder(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/customer/detail/?${this.serializeParams(order)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getOrderDetail(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/store/details/${order.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  changeAddress(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/customer/modify/address/${order.id}/`;

    return this.http.put(url, order, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getReturnProgress(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/customer/review/return/${order.id}/`;

    return this.http.put(url, order, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  cancelOrder(order): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/customer/cancel/${order.id}/`;

    return this.http.put(url, order, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  forgetOrderNumber(order): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/get/numbers/?${this.serializeParams(order)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  returnRequest(order): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/customer/return/${order.id}/`;

    return this.http.put(url, order, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getCountryList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}address/country/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getStateList(country:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}address/state/${country.cid}/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getInvoice(params:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/invoice/${params.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  checkIsAuth(response) {
    if(response.status == 401) {
      return Promise.reject(401);
    }
    return response.json();
  }

  private handleError(error: Response | any, target?:any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 401) {
        if(target) {
          if(!target.routerLink) {
            target.routerLink = window.location.pathname;
            target.guardLinkService.addRouterLink(target.routerLink);
          }
          target.router.navigate(['/account/login']);
          return Promise.reject(401);
        }
      }
      const body = error.json() || '';
      const err = body.error || body;
      if (err.detail) {
        errMsg = `${err.detail}`;
      } else {
        if (err.error) {
          errMsg = 'Sorry! Server is busy now!';
        }
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
