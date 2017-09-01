export class Joiners {
  count : number;
  next: any;
  previous: any;
  result : Vote[];
}

export class Vote{
  id : number;
  joiner : Joiner;
  vote : any = null;
}

export class Joiner {
  id : number;
}
