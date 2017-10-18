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
