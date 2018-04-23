import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject, BehaviorSubject} from 'rxjs';

import {BaseApi} from '../../config/app.api';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';
import {GuardLinkService} from '../../shared/services/guard-link/guard-link.service';
import {Router} from '@angular/router';

@Injectable()
export class ShopService {

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private auth: AuthenticationService,
    public guardLinkService: GuardLinkService,
    public router: Router
  ) {}

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if (data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  currentListingTab: Subject<any> = new BehaviorSubject<any>(null);

  public setCurrentListingTab(newTab: number): void {
    this.currentListingTab.next(newTab);
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

  getProductCategoryList(category): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/store/category/list/?${this.serializeParams(category)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  createCategory(category: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/category/create/`;

    return this.http.post(url, category, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getProductList(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/goods/list/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getProduct(id: number): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/goods/detail/${id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }


  createProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/relation/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  deleteProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'app  lication/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/goods/detail/${product.id}/`;

    return this.http.delete(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  changeProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/goods/detail/${product.id}/`;

    return this.http.put(url, product, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  publishProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/goods/updown/${product.id}/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  createProductCategory(category: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/category/create/`;

    return this.http.post(url, category, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  deleteProductCategory(category: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/category/detail/${category.id}/`;

    return this.http.delete(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  editProductCategory(category: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/category/detail/${category.id}/`;

    return this.http.put(url, category, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getSupplyProductList(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}product/store/list/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getSupplyProductRecommendList(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}product/recommend/list/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getProductListBySupply(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}product/supplier/store/list/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  getSupplyProductDetail(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}product/detail/${product.id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }


  addToCart(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/cart/list/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(this.checkIsAuth)
      .catch((error) => {this.handleError(error, this)});
  }

  createSupplyProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/goods/create/`;

    return this.http.post(url, product, options)
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

  checkIsAuth(response) {
    if(response.status == 401) {
      return Promise.reject(401);
    }
    return response.json();
  }

  private handleError(error: Response | any, target?: any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 401) {
        if (target) {
          if (!target.routerLink) {
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
