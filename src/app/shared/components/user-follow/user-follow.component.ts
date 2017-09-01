import { Input, Component, OnInit } from '@angular/core';

import { FollowService } from './user-follow.service';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss'],
  providers: [FollowService]
})

export class UserFollowComponent implements OnInit {
  @Input() public id: number;
  @Input() public follow: boolean;
  @Input() public followersAmount: number;
  @Input() public expertId: any;
  private disabled:boolean = false;

  constructor(private followService: FollowService) {}

  ngOnInit(): void {
  }

  changeFollow() {

    if(!this.disabled) {
      this.disabled = true;

      let self = this;

      this.followService.follow(this.id).then((data)=> {
        this.disabled = false;
        self.follow = data.follow;
        if(self.expertId && self.expertId != self.id) {
          if(self.follow == false) {
            self.followersAmount--;
          } else {
            self.followersAmount++;
          }
        }
      });

    }
  }

}
