import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { AuthService } from 'ngx-auth';

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(private http: Http) {}

  public isAuthorized(): Observable<boolean> {
    const isAuthorized: boolean = !!localStorage.getItem('accessToken');

    return Observable.of(isAuthorized);
  }

  public getAccessToken(): Observable<string> {
    const accessToken: string = localStorage.getItem('accessToken');

    return Observable.of(accessToken);
  }

  public refreshToken(): Observable<any> {
    const refreshToken: string = localStorage.getItem('refreshToken');

    let self = this;
    return this.http
      .post('http://localhost:3001/refresh-token', { refreshToken })
      .catch((error: any) => {
        self.logout();

        return Observable.throw(error.statusText);
      })
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('refresh-token');
  }

  public getTokenExpireDate(): Observable<string> {
    const expireDate: string = localStorage.getItem('expireDate');
    return Observable.of(expireDate);
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expireDate');
    location.reload(true);
  }

}
