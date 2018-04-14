import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-template-6',
  templateUrl: './main-page.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class MainPageComponent implements OnInit {
  storeName: string = 'STORE NAME';
  text: string = '';
  isShowMenu: boolean = false;
//是否为新手引导
  isGuide: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private storeService: StoreService,
              private userService: UserService) {

    let url = this.router.url;
    this.isGuide = url.indexOf('guide/preview') >= 0;
  }

  ngOnInit(): void {
    let self = this;
    self.userService.store.subscribe((data) => {
      if (data) {
        self.storeName = data.name;
        self.storeService.getStore(data.displayName).then((data) => {
          self.text = data.description;
          self.storeService.addStore(data);
        });
      }
    });
  }

  ngOnDestroy() {

  }

  changeShowMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  closeShowMenu() {
    this.isShowMenu = false;

  }

  jumpCart(): void {
    if (this.isGuide) {
      this.router.navigate([`/shop/guide/preview/6/cart`]);
    } else {
      this.router.navigate([`/shop/templates/preview/6/cart`]);
    }

  }
}
