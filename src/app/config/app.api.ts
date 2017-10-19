import { environment } from '../../environments/environment';

export class BaseApi{
  url: string;

  constructor(){
    this.url = 'http://45.33.50.95/';
    if(environment.production === true) {
      this.url = 'http://45.33.50.95/';
    }

  }
}

export class SystemConstant{
  accessUrl : string = 'https://media.xberts.com';
  baseUrl : string = 'https://xbertsmedia.s3.amazonaws.com';

  clientId : string = 'SxnVI98BehT3NSCLbhrP4GFiig6erbTkYMaSRvkQ';
}
