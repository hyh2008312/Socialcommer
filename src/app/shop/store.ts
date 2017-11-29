export class Store {
  id : number;
  name : string;
  description: string;
  cover: string;
  ownerId: number;
  ownerAvatar: string;
  ownerCountry: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerBiography: string;
  category: any;
  nameTag: any = '';
  titleTag: any = '';
  descriptionTag: any = '';
  userTag: any = '';
  imageUrl: any = [];
  status: any;
  currency: string;

  displayName: string;
}

export class Product {
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

export class Blog{
  context: string = '';
  cover: string = '';
  created: string = '';
  description: string = '';
  id: any;
  owner: any;
  modified: string = '';
  status: string = 'published';
  subTitle: string = '';
  title: string = '';
}

export class Image{
  id: number;
  url: string = '';
}
