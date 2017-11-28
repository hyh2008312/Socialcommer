import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { Title, Meta } from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';
import{ Subject, BehaviorSubject } from 'rxjs';

import { Store } from './store';

import { BaseApi, DataApi } from '../config/app.api';

@Injectable()
export class StoreService {
  store: Subject<Store> = new BehaviorSubject<Store>(null);

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private dataUrl: DataApi,
    private jsonp : Jsonp,
    private titleService: Title,
    private metaService: Meta
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

  serializeParamsJSONP(params) {

    let _params = new URLSearchParams();

    for (const key in params) {
      _params.set( key, params[key]);
    }
    _params.set('callback', "JSONP_CALLBACK");

    return _params;
  }

  getStore(name:string): Promise<Store> {

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

  getProductList(product: any): Promise<any> {

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

  getProduct(id: any): Promise<any> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}store/relation/${id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getBlog(blog: any): Promise<any>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}blog/read/?${this.serializeParams(blog)}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public addStore(newStore: any): void {
    this.store.next(newStore);
  }

  pageView(statistics): Promise<any> {

    const url = `${this.dataUrl.url}data/upload/page_view`;

    return this.http.get(url,{search: this.serializeParamsJSONP(statistics)})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  buttonClick(statistics): Promise<any> {

    const url = `${this.dataUrl.url}data/upload/buy_click`;

    return this.http.get(url,{search: this.serializeParamsJSONP(statistics)})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  addTitleDescription(data:any) {
    this.titleService.setTitle(data.title);
    this.metaService.addTag({name: 'description', content: data.description});
    this.metaService.addTag({property: "og:title", content: data.title});
    this.metaService.addTag({property: "og:description", content: data.description});
    this.metaService.addTag({property: "og:image", content: data.shareImage});
    this.metaService.addTag({property: "og:image:width", content: '600'});
    this.metaService.addTag({property: "og:image:height", content: '315'});
    this.metaService.addTag({property: "og:url", content: location.href});
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
