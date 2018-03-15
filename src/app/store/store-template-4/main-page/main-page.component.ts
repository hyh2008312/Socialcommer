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
  storeName: string = '';
  text: string = '';
  productNumber: number = 0;
  displayName:string ;

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private router:Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.storeName = data.context ? data.context.nameTag : data.name;
        self.text = data.description;
        self.displayName = data.displayName ;
      }
    });
    self.storeService.cart.subscribe((data) => {
      if(data && data.length>0) {
        self.productNumber = 0;
        for(let item of data) {
          self.productNumber += parseInt(item.number);
        }
      }
    });
  }

  ngOnDestroy() {

  }

  isShowNav = false;

  changeNavigationShow(isShowNavigation: any): void {
    this.isShowNav = isShowNavigation;
  }
  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }
}
