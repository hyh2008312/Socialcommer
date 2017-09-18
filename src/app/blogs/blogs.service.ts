import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Blogs, Achievement} from './blogs';

import { BaseApi } from '../config/app.api';

@Injectable()
export class BlogsService {
  private blogsUrl = 'blogs/';
  private achievementUrl = 'achievement/';

  constructor( private http: Http, private baseUrl: BaseApi) { }

  createAuthorizationHeader(headers: Headers) {

    if(window['WebAppInterface']) {
      headers.append('Authorization', window['WebAppInterface'].getAccessToken() != '' ?
      'Bearer ' + window['WebAppInterface'].getAccessToken(): '');
    }

  }

  getBlogsDetail(id:number): Promise<Blogs> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}${this.blogsUrl}${id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Blogs)
      .catch(this.handleError);
  }

  getAchievement(id:number): Promise<Achievement> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}xberts/experts/${id}/${this.achievementUrl}`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Achievement)
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
