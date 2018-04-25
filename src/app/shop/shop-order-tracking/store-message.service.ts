import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams} from '@angular/http';
import {Title, Meta} from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/observable';
import {Subject, BehaviorSubject} from 'rxjs';
import {BaseApi} from '../../config/app.api';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {GuardLinkService} from '../../shared/services/guard-link/guard-link.service';

@Injectable()
export class StoreMessageService {

  routerLink: any = false;

  constructor(
    private http: Http,
    private baseApi: BaseApi,
    private auth: AuthenticationService,
    public guardLinkService: GuardLinkService) {
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

  serializeParamsJSONP(params) {

    let _params = new URLSearchParams();

    for (const key in params) {
      _params.set(key, params[key]);
    }
    _params.set('callback', "JSONP_CALLBACK");

    return _params;
  }

  //提交反馈消息
  submitIssue(params: any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    const url = `${this.baseApi.url}order/store/message/${params.lineId}/`;
    return this.http.post(url, params, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  // 请求客服信息
  requestMessage(params: any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    const url = `${this.baseApi.url}order/store/message/${params.lineId}/`;
    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  //解决问提，将状态改为关闭
  requestCloseMessage(params: any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    const url = `${this.baseApi.url}order/store/message/close/${params.lineId}/`;
    return this.http.put(url, params, options)
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
