export class BaseApi{
  url: string;

  constructor(){
    this.url = 'https://api-staging.xberts.com/';
    if((<any>window).env.ENV === 'prod') {
      this.url = 'https://api.xberts.com/';
    }

  }
}
