import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { Title, Meta } from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';
import { Observable } from  'rxjs/observable';
import{ Subject, BehaviorSubject } from 'rxjs';
import { BaseApi } from '../../config/app.api';

@Injectable()
export class StoreCartService {

  constructor(
    private http: Http,
    private baseApi: BaseApi,
    private jsonp : Jsonp,
    private titleService: Title,
    private metaService: Meta
  ) { }

  createAuthorizationHeader(headers: Headers) {

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

  serializeParamsJSONP(params) {

    let _params = new URLSearchParams();

    for (const key in params) {
      _params.set( key, params[key]);
    }
    _params.set('callback', "JSONP_CALLBACK");

    return _params;
  }

  createOrder(cart) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/create/`;

    return this.http.post(url, cart, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
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
      .then(response => response.json())
      .catch(this.handleError);
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
      .then(response => response.json())
      .catch(this.handleError);
  }

  getShippingList(obj): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}shipping/car/list/?${this.serializeParams(obj)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createMail(mail:any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}mail/create/`;

    return this.http.post(url, mail, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createShippingAddress(address:any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/shipping/address/create/`;

    return this.http.post(url, address, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getShippingAddressItem(address:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}address/shipping/${address.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createBillingAddress(address:any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}address/billing/create/`;

    return this.http.post(url, address, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getBillingAddress(address:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}address/billing/${address.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createPayment(payment:any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/payment/create/`;

    return this.http.post(url, payment, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  addOrder(order:any) {
    localStorage.setItem('order', JSON.stringify(order));
  }

  getOrder(): any {
    if(localStorage && localStorage.getItem('order')) {
      return JSON.parse(localStorage.getItem('order'));
    }
    return {};
  }


  addShippingAddress(shippingAddress:any) {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }

  getShippingAddress(): any {
    if(localStorage && localStorage.getItem('shippingAddress')) {
      return JSON.parse(localStorage.getItem('shippingAddress'));
    }
    return {};
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
