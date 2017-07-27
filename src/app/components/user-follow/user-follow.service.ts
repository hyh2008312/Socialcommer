import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Follow } from './user-follow';

@Injectable()
export class FollowService {
  private followUrl = 'https://api-staging.xberts.com/xberts/experts/';

  constructor( private http: Http ) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
      'Iw4GAwU8i31tUUuMwbKVOYQbxfC0dJ');
  }

  follow(id:number): Promise<Follow> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.followUrl}${id}/follow/`;

    return this.http.post(url, null, options)
      .toPromise()
      .then(response => response.json() as Follow)
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
