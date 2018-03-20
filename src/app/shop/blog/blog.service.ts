import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject, BehaviorSubject} from 'rxjs';

import {StoreProduct, Email, Store} from './blog';

import {BaseApi, SupportApi} from '../../config/app.api';
import {AuthenticationService} from '../../shared/services/authentication/authentication.service';

@Injectable()
export class BlogService {

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private auth: AuthenticationService
  ) {}

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if (data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  currentBlogTab: Subject<any> = new BehaviorSubject<any>(null);

  public setCurrentBlogTab(newTab: number): void {
    this.currentBlogTab.next(newTab);
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

  getBlog(blog: any): Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl.url}blog/list/?${this.serializeParams(blog)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
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
      .then(response => response.json())
      .catch(this.handleError);
  }

  createBlog(blog: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}blog/list/`;

    return this.http.post(url, blog, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeBlog(blog: any): Promise<StoreProduct> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers: headers});
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

    let options = new RequestOptions({headers: headers});
    this.createAuthorizationHeader(headers);

    const url = `${this.baseUrl.url}blog/${blog.id}/`;

    return this.http.delete(url, options)
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
