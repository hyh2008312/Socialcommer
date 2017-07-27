import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Questions } from './questions';

import { WindowRef } from '../provider/window-ref.provider';

@Injectable()
export class QuestionsService {
  private answersUrl = 'https://api-staging.xberts.com/answers/';

  constructor( private http: Http,
               private windowRef: WindowRef) { }

  createAuthorizationHeader(headers: Headers) {

    headers.append('Authorization',
      this.windowRef.webAppInterface && this.windowRef.webAppInterface.getAccessToken() != '' ?
      'Bearer ' + this.windowRef.webAppInterface.getAccessToken(): '');
  }

  getAnswerDetail(id:number): Promise<Questions> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.answersUrl}${id}/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Questions)
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
