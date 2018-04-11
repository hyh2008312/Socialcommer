import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject, BehaviorSubject} from 'rxjs';

import {BaseApi} from '../config/app.api';
import {AuthenticationService} from '../shared/services/authentication/authentication.service';

import { Router } from '@angular/router';
import { GuardLinkService} from '../shared/services/guard-link/guard-link.service';

@Injectable()
export class ShopService {

  routerLink: any = false;

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private auth: AuthenticationService,
    public router: Router,
    public guardLinkService: GuardLinkService
  ) {}

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if (data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  templateUid: Subject<any> = new BehaviorSubject<any>(null);

  public setTemplateUId(newTab: number): void {
    this.templateUid.next(newTab);
  }

  templateList: Subject<any> = new BehaviorSubject<any>(null);

  public setTemplateList(newTab: number): void {
    this.templateList.next(newTab);
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

  getCategoryList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/category/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getStore(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/create/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  changeStore(store: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/update/${store.id}/`;

    return this.http.put(url, store, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getUserProfile(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}user/userprofile/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  changeUserProfile(user: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}user/userprofile/`;

    return this.http.put(url, user, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  changePassword(password: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}user/pw/`;

    return this.http.put(url, password, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  changeEmail(email: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}user/email/`;

    return this.http.put(url, email, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  createTemplate(store: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}store/update/template/`;

    return this.http.put(url, store, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  createMultiTemplate(store: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}store/template/list/`;

    return this.http.put(url, store, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getMultiTemplate(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}store/update/template/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  updateMultiTemplate(store: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}store/template/detail/${store.id}/`;

    return this.http.put(url, store, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getTemplateProductList(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}store/goods/category/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getFlashSaleList(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    const url = `${this.baseUrl.url}store/promotion/goods/list/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getFrontStore(name: string): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}stores/${name}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  // 获取每个分类以及分类下的产品
  getCategoryProduct(name: string): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}stores/${name}/goods/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch(this.handleError);
  }

  getBlog(blog: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}blog/list/?${this.serializeParams(blog)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getBlogDetail(id: number): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}blog/${id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch(this.handleError);
  }

  getSupplyCategory(category?: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}product/category/create/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch(this.handleError);
  }

  getCountryList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}address/country/ship/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getShippingList(obj): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}shipping/car/list/?${this.serializeParams(obj)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  /**
   * 获取商品的详情（与前端相同的接口）
   * @param id  商品的ID
   * @returns {Promise<any>}
   */
  getProductDetail(id: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}store/customer/goods/detail/${id}/`;

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
