import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss']
})

export class UserFollowComponent implements OnInit {
  @Input() public follow: boolean;

  ngOnInit(): void {
  }

  changeFollow() {
    this.follow = !this.follow;
  }

}
