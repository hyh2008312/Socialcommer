import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {BaseApi} from '../../config/app.api';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

@Injectable()
export class DashboardService {

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private auth: AuthenticationService
  ) {
  }

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
      if (Array.isArray(params[key])) {
        if (params[key].length > 0) {
          let item = params[key].join(',');
          array.push(key + '=' + item);
        }
      } else {
        if (params[key] != undefined) {
          array.push(key + '=' + params[key]);
        }
      }
    }

    return array.join('&');
  }

  getStoreStatistics(store: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}dashboard/store/data/?${this.serializeParams(store)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSaleMonthly(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}dashboard/sell/data/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getProductStatistics(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}dashboard/goods/top/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
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
