import { Input, Component, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';

import { FollowService } from './user-follow.service';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss'],
  providers: [FollowService]
})

export class UserFollowComponent implements OnInit {
  @Input() public id: number;
  @Input() public expertId: any;
  follow: boolean = false;

  @Output() onFollowerChange = new EventEmitter();

  private disabled:boolean = false;

  constructor(private followService: FollowService) {}

  ngOnInit(): void {}

  ngOnChanges():void  {
    if(this.id) {
      this.follow = this.getFollowList();
    }
  }

  changeFollow() {

    if(!this.disabled) {
      this.disabled = true;

      if(window['WebAppInterface']) {
        if(window['WebAppInterface'].getAccessToken() == '') {
          window['WebAppInterface'].toLogin();
          this.disabled = false;
          return;
        }
      }

      let self = this;

      self.followService.follow(self.id).then((data)=> {
        self.disabled = false;
        self.follow = data.follow;
        if(self.expertId) {
          if(self.follow == false) {
            if(window['WebAppInterface']) {
              window['WebAppInterface'].deleteFollowProfile(self.id.toString());
            }
            self.changeFollower(self.follow);
          } else {
            if(window['WebAppInterface']) {
              window['WebAppInterface'].addFollowProfile(self.id.toString());
            }
            self.changeFollower(self.follow);
          }
        }
      });

    }
  }

  changeFollower(follower:boolean) {
    this.onFollowerChange.emit(follower);
  }

  getFollowList() {
    if(window['WebAppInterface']) {
      let followList = window['WebAppInterface'].getFollowProfiles();
      followList = followList.split(',');
      alert(followList);

      let self = this;
      if(followList.find(item => item == self.id.toString())) {
        return true;
      }
    }

    return false;
  }

}
