export class Questions {
  id : number;
  questionTitle : string;
  description : string;
  owner: Owner;
}

export class Owner {
  id : number;
  badgePoint : number;
  currentUser : CurrentUser;
  firstName : string;
  userprofile: Userprofile;
}

export class Userprofile {
  avatar : string;
  company : string;
  position : string
}

export class CurrentUser {
  follow : boolean;
}
