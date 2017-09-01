export class Blogs {
  id : number;
  title : string;
  details : string;
  description: string;
  created: string;
  cover: string;
  owner: Owner
}

export class Owner {
  id: number;
  first_name: string;
  last_name: string;
  badge_point: number;
  current_user: CurrentUser;
  userprofile: Userprofile;
}

export class Userprofile {
  avatar : string;
  company : string;
  position : string;
}

export class CurrentUser {
  follow : boolean;
}

export class Achievement {

  answerAmount : number = 0;
  blogAmount :number = 0;
  blogApprovedAmount : number = 0;
  followeesAmount : number = 0;
  followersAmount : number = 0;
  inviteeAmount : number = 0;
  questionAmount : number = 0;
  questionAnsweredAmount : number = 0;
  questionFeatureAmount : number = 0;
  reviewFeaturedAmount : number = 0;
  shareProductAmount : number = 0;
  shareProductFeaturedAmount : number = 0;
  thumbsUpAmount : number = 0;
  trialAmount : number = 0;
}