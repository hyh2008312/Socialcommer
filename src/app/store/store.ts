export class Store {
  id : number;
  name : string;
  details : string;
  description: string;
  cover: string;
  owner: Owner;
}

export class Owner{
  avatar: string;
  firstName: string;
  id: number;
  lastName: string;
  country: string;
}
