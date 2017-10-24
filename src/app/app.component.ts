import { Component} from '@angular/core';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SocialCommer';

  constructor(
    private userService: UserService
  ) {
    let self = this;

    // 防止懒加载重定向
    if(!window['userInfo']) {
      window['userInfo'] = true;
      self.userService.currentUser.subscribe((data) => {
        if( data == null ) {
          self.userService.getUser().then((data) => {
            self.userService.addUser(data);
          });
        }
      });
    }
  }

}
