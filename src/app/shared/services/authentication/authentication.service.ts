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
    const isAuthorized: boolean = !!localStorage.getItem('oauthtoken');

    return Observable.of(isAuthorized);
  }

  public getAccessToken(): Observable<string> {
    const accessToken: string = localStorage.getItem('oauthtoken').accessToken;

    return Observable.of(accessToken);
  }

  public refreshToken(): Observable<any> {
    const refreshToken: string = localStorage.getItem('oauthtoken').refreshToken;

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
    const expireDate: string = localStorage.getItem('oauthtoken').expireDate;
    return Observable.of(expireDate);
  }

  public logout(): void {
    localStorage.removeItem('oauthtoken');
    location.reload(true);
  }

}
