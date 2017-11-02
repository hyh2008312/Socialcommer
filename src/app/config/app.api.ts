import { environment } from '../../environments/environment';

export class BaseApi{
  url: string;

  constructor(){
    this.url = 'http://45.33.50.95/';
    if(environment.production === true) {
      this.url = 'http://45.33.50.95/';
      //this.url = 'http://192.168.2.43:9009/';
    }

  }
}

export class SystemConstant{
  accessUrl : string = 'https://media.xberts.com';
  baseUrl : string = 'https://xbertsmedia.s3.amazonaws.com';

  clientId : string = 'pMmnRNF1bjJk4aQDF6zq36FS4WQ7giI0vCQcHgUZ';
}
