import { Injectable } from '@angular/core';
import { Http, Response , Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import{ Subject, BehaviorSubject } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';

import { BaseApi,SystemConstant } from '../../../config/app.api';
import { User } from './user';
import { Store } from '../../../shop/shop';

@Injectable()
export class UserService {
  currentUser: Subject<User> = new BehaviorSubject<User>(null);
  store: Subject<Store> = new BehaviorSubject<Store>(null);
  userCategory: Subject<any> = new BehaviorSubject<any>(null);
  pubCategory: Subject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: Http,
    private baseUrl: BaseApi,
    private systemConstant: SystemConstant,
    private auth: AuthenticationService
  ) {

  }

  createAuthorizationHeader(headers: Headers) {

    this.auth.getAccessToken().subscribe((data) => {
      if(data) {
        headers.append('Authorization', 'Bearer ' + data);
      }
    });

  }

  getUser(): Promise<User>  {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.createAuthorizationHeader(headers);

    let options = new RequestOptions({headers:headers});

    const url = `${this.baseUrl.url}user/user/`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  public addUser(newUser: User): void {
    this.currentUser.next(newUser);
  }

  public addStore(newStore: Store): void {
    this.store.next(newStore);
  }

  public addUserCategory(newCategory: any): void {
    this.userCategory.next(newCategory);
  }

  public addPubCategory(newCategory: any): void {
    this.pubCategory.next(newCategory);
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
