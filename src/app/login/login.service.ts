import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Login, SignUp } from './login';

import { BaseApi, SystemConstant } from '../config/app.api';

@Injectable()
export class LoginService {

  constructor( private http: Http, private baseUrl: BaseApi, private systemConstant: SystemConstant) { }

  login(token:any): Promise<Login> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}oauth2/token/`;

    token.client_id = this.systemConstant.clientId;
    token.grant_type = "password";

    return this.http.post(url, token, options)
      .toPromise()
      .then(response => response.json() as Login)
      .catch(this.handleError);
  }

  signUp(object: any): Promise<SignUp> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/signup/`;

    return this.http.post(url, JSON.stringify(object), options)
      .toPromise()
      .then(response => response.json() as SignUp)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || body;
      errMsg = `${err.detail}`;
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }
    return Promise.reject(errMsg);
  }

}
