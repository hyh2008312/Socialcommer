import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import{ Subject, BehaviorSubject } from 'rxjs';
import { BaseApi } from '../../config/app.api';

@Injectable()
export class OrderTrackingService {

  order: Subject<any> = new BehaviorSubject<any>(null);

  public addOrder(newOrder: any): void {
    this.order.next(newOrder);
  }

  constructor(
    private http: Http,
    private baseApi: BaseApi
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

  getOrder(order:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/customer/detail/?${this.serializeParams(order)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  cancelOrder(order): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseApi.url}order/customer/cancel/${order.id}/`;

    return this.http.put(url, order, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 401) {
        errMsg = 'Your email or password is incorrect. Please try again!';
      } else {
        const body = error.json() || '';
        const err = body.error || body;
        if(err.detail) {
          errMsg = `${err.detail}`;
        } else {
          if(err.error) {
            errMsg = "Sorry! Server is busy now!";
          }
        }
      }
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
