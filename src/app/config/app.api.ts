declare const process: any; // Typescript compiler will complain without this

export class BaseApi{
  url: string;

  constructor(){
    this.url = 'https://api-staging.xberts.com/';
    if(process.env.ENV === 'prod') {
      this.url = 'https://api.xberts.com/';
    }

  }
}
