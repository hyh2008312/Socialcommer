import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { StoreProduct, Email, Store} from './shop';

import { BaseApi } from '../config/app.api';
import { AuthenticationService } from '../shared/services/authentication/authentication.service';

@Injectable()
export class ShopService {

  constructor( private http: Http, private baseUrl: BaseApi, private auth: AuthenticationService) { }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if(data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  serializeParams(params) {

    let array = [];

    for (const key in params) {
      array.push(key + '=' + params[key]);
    }

    return array.join('&');
  }

  getProductList(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/relation/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getProduct(id: number): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/relation/${id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createProduct(product: any): Promise<StoreProduct> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/relation/`;

    return this.http.post(url, product, options)
      .toPromise()
      .then(response => response.json() as StoreProduct)
      .catch(this.handleError);
  }

  deleteProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'app  lication/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/relation/${product.productId}/`;

    return this.http.delete(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeProduct(product: any): Promise<StoreProduct> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/relation/${product.id}/`;

    return this.http.put(url, product, options)
      .toPromise()
      .then(response => response.json() as StoreProduct)
      .catch(this.handleError);
  }

  publishProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/relation/on/${product.productId}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  unpublishProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/relation/off/${product.productId}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getStore(): Promise<Store> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/list/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Store)
      .catch(this.handleError);
  }

  changeStore(store:any): Promise<Store> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}stores/${store.id}/`;

    return this.http.put(url, store, options)
      .toPromise()
      .then(response => response.json() as Store)
      .catch(this.handleError);
  }

  getUserProfile(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}user/userprofile/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeUserProfile(user: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}user/userprofile/`;

    return this.http.put(url, user, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeAvatar(user: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}user/userprofile/avatar/`;

    return this.http.put(url, user, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changePassword(password:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/pw/`;

    return this.http.put(url, password, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeEmail(email:any): Promise<Email> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/email/`;

    return this.http.put(url, email, options)
      .toPromise()
      .then(response => response.json() as Email)
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
