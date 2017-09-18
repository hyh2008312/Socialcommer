import { environment } from '../../environments/environment';

export class BaseApi{
  url: string;

  IMAGE_UPLOAD_TYPE = {
    'BLOG_COVER':{
      'category': 'blog',
      'use': 'cover',
      'originUrl':'image/blog/cover/',
      'list': 'xy',
      'detail': 'co'
    },
    "BLOG_DETAILS": {
      'category': 'blog',
      'use': 'details',
      'originUrl':'image/blog/details/',
      'detail': 'mo'
    }
  };

  constructor(){
    this.url = 'https://api-staging.xberts.com/';
    if(environment.production === true) {
      this.url = 'https://api.xberts.com/';
    }

  }
}
