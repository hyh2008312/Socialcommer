import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Store } from './store';

import { BaseApi } from '../config/app.api';

@Injectable()
export class StoreService {

  constructor( private http: Http, private baseUrl: BaseApi) { }

  createAuthorizationHeader(headers: Headers) {

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
