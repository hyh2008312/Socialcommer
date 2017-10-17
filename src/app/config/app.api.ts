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
    this.url = 'http://45.33.50.95/';
    if(environment.production === true) {
      this.url = 'http://45.33.50.95/';
    }

  }
}
