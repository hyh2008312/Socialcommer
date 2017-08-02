import { environment } from '../../environments/environment';

export class BaseApi{
  url: string;

  constructor(){
    this.url = 'https://api-staging.xberts.com/';
    if((<any>window).env == 'prod') {
      this.url = 'https://api.xberts.com/';
      return;
    }
    if(environment.production === true) {
      this.url = 'https://api.xberts.com/';
    }

  }
}
