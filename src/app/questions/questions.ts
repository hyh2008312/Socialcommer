export class Questions {
  id : number;
  questionTitle : string;
  description : string;
  owner: Owner;
  created: string;
  isBestAnswer: boolean = false;
}

export class Owner {
  id : number;
  badgePoint : number;
  firstName : string = '';
  avatar : string;
  company : string = '';
  position : string = '';
}

