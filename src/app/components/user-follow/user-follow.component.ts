import { Input, Component, OnInit } from '@angular/core';

import { FollowService } from './user-follow.service';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss']
})

export class UserFollowComponent implements OnInit {
  @Input() public id: number;
  @Input() public follow: boolean;

  constructor(private followService: FollowService) {}

  ngOnInit(): void {
  }

  changeFollow() {

    var self = this;
    this.followService.follow(this.id).then((data)=> {
      self.follow = data.follow;
    });

  }

}
