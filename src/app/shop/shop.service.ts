import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import{ Subject, BehaviorSubject } from 'rxjs';

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

  currentListingTab: Subject<any> = new BehaviorSubject<any>(null);

  public setCurrentListingTab(newTab: number): void {
    this.currentListingTab.next(newTab);
  }

  templateList: Subject<any> = new BehaviorSubject<any>(null);

  public settTemplateList(newTab: number): void {
    this.templateList.next(newTab);
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

  getCategoryList(): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}category/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createCategory(category: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}category/`;

    return this.http.post(url, category, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
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

  getRecommendProductList(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}products/?${this.serializeParams(product)}`;

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

  getRecommendProduct(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}products/${product.id}/`;

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

    const url = `${this.baseUrl.url}store/relation/${product.id}/`;

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

    const url = `${this.baseUrl.url}store/relation/on/${product.id}/`;

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

    const url = `${this.baseUrl.url}store/relation/off/${product.id}/`;

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

    const url = `${this.baseUrl.url}store_create/${store.id}/`;

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

  getMultiTemplateDetail(uid:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}store/template_detail/${uid}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createTemplate(store:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}store/template/`;

    return this.http.post(url, store, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createMultiTemplate(store:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}store/template_list/`;

    return this.http.post(url, store, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getMultiTemplate(template:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}store/template_list/?${this.serializeParams(template)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateMultiTemplate(store:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}store/template_detail/${store.id}/`;

    return this.http.put(url, store, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTemplateProductList(product: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}store/relation/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSubCategory(category: any):Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}subcategory/?${this.serializeParams(category)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getFrontStore(name:string): Promise<Store> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}stores/${name}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Store)
      .catch(this.handleError);
  }

  getStoreStatistics(store:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}statistics/store/${store.id}/?${this.serializeParams(store)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getProductStatistics(product:any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}statistics/product/?${this.serializeParams(product)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCategory(category: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}relation/category/?${this.serializeParams(category)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createProductCategory(category: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}relation/category/`;

    return this.http.post(url, category, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteProductCategory(category: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}relation/category/${category.id}/`;

    return this.http.delete(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  editProductCategory(category: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}relation/category/${category.id}/`;

    return this.http.put(url, category, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getBlog(blog: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}statistics/blog/?${this.serializeParams(blog)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getBlogDetail(id: number): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}blog/${id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createBlog(blog: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}blog/`;

    return this.http.post(url, blog, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeBlog(blog: any): Promise<StoreProduct> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}blog/${blog.id}/`;

    return this.http.put(url, blog, options)
      .toPromise()
      .then(response => response.json() as StoreProduct)
      .catch(this.handleError);
  }

  deleteBlog(blog: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}blog/${blog.id}/`;

    return this.http.delete(url, options)
      .toPromise()
      .then(response => response.json())
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
