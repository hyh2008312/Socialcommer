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
  @Input() public expertId: any;

  @Output() followerChange = new EventEmitter();

  private disabled:boolean = false;

  constructor(private followService: FollowService) {}

  ngOnInit(): void {
  }

  changeFollow() {

    if(!this.disabled) {
      this.disabled = true;

      if(window['WebAppInterface']) {
        if(window['WebAppInterface'].getAccessToken() == '') {
          window['WebAppInterface'].toLogin();
        }
        this.disabled = false;
        return;
      }

      let self = this;

      this.followService.follow(this.id).then((data)=> {
        this.disabled = false;
        self.follow = data.follow;
        if(self.expertId && self.expertId != self.id) {
          if(self.follow == false) {
            self.changeFollower(self.follow);
          } else {
            self.changeFollower(self.follow);
          }
        }
      });

    }
  }

  changeFollower(follower:boolean) {
    this.followerChange.emit(follower);
  }

}
