import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-store-preview',
  templateUrl: './store-preview.component.html',
  styleUrls: ['../../store/store.scss']
})

export class StorePreviewComponent implements OnInit {

  storeName: any = false;
  baseLink: any = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      if(data) {
        if(data.store && data.store.length> 0) {
          self.storeName = data.store[0].displayName;
          self.baseLink = 'http://'+ window.location.host + '/store/'+ self.storeName;
        }
      }
    });
  }

  ngOnInit():void {

  }

  close():void {
    this.router.navigate(['/shop/store']);
  }

}
