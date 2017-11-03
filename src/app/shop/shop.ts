export class Shop {
  id : number;
  title : string;
  details : string;
  description: string;
  created: string;
  cover: string;
}

export class RecommendProduct {
  categoryId : number;
  categoryName : string;
  createdTime : string;
  description : string;
  id : number;
  imageUrl : any = [];
  isUser : boolean;
  modifiedTime : string;
  originalPriceAmount : number;
  originalPriceCurrency : string;
  purchaseUrl : string;
  recommendation : string;
  salePriceAmount : number;
  salePriceCurrency : string;
  source : string;
  tags : string;
  title: string;
}

export class Product {
  id: number;
  name: string;
  title: string;
  description: string;
  status: string;
  created: string;
  tags: string;
  categoryId: number;
  categoryName: string;
  owner: any;
  salePrice: any = 0;
  originalPrice: any = 0;
  cover: any;
  isDraft: boolean;
}

export class StoreProduct{
  id: number;
  productId: number;
  status: string;
  categoryId: number;
  categoryName: string;
  created: string;
  name: string;
  title: string;
  recommendation: string;
  description: string;
  tags: string;
  owner: any;
  product: Product;

  cover: any;
  storeId: number;
  purchaseUrl: string;
  isCustomer: boolean;
  isDraft: boolean;
  isUser: boolean;
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

export class Image{
  id: number;
  url: string = '';
}
