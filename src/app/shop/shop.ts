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
  imageUrls: any;
  status: string;
  created: string;
  tags: string;
  owner: any;
  salePrice: any;
  originalPrice: any;
}

export class StoreProduct{
  id: number;
  status: string;
  category: string;
  created: string;
  name: string;
  title: string;
  recommendation: string;
  owner: any;
  product: Product;

  image: any;
  storeId: number;
  purchaseUrl: string;
  isCustomer: boolean;
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
  created: string;
  status: any;
}
