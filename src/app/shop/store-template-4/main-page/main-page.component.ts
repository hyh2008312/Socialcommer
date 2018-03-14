import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-template-4',
  templateUrl: './main-page.component.html',
  styleUrls: ['../_store-template-4.scss']
})

export class MainPageComponent implements OnInit {
  storeName: string = 'STORE NAME';
  text: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private router: Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
    let self = this;
    self.userService.store.subscribe((data) => {
      if (data) {
        self.storeService.getStore(data.displayName).then((data) => {
          self.text = data.description;
        });
      }
    });
  }

  jumpCart(): void {
    this.router.navigate([`/shop/templates/preview/4/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`/shop/templates/preview/4/order`]);
  }

  ngOnDestroy() {
  }

}
