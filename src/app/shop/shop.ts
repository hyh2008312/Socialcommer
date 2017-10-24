export class Shop {
  id : number;
  title : string;
  details : string;
  description: string;
  created: string;
  cover: string;
}

export class Product {
  id: number;
  name: string;
  title: string;
  description: string;
  image_urls: any;
  status: string;
  created: string;
  tags: string;
  owner: any;
  sale_price: string;
  original_price: string;
}

export class Email{
  email: string;
}

export class Store{
  id: number;
  name: string;
  displayName: string;
  owner: any;
  description: string;
  currency: string;
  url: string;
  country: string;
}
