import {Component, OnInit, OnDestroy} from '@angular/core';
import {StoreService} from '../../store.service';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-shop-template-5',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class MainPageComponent implements OnInit {
  storeName: string = '';
  text: string = '';
  categories: any;

  isShowMenu: boolean = false;

  contactUsTag: string = '';
  ownerId: any;
  blog: any = [];
  isHaveBlog: boolean = true;
  productNumber: number = 0;
  displayName: string;

  constructor(private storeService: StoreService,
              private  router: Router) {
  }

  ngOnInit(): void {
    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.storeName = data.context ? data.context.nameTag : data.name;
        self.displayName = data.displayName;
        self.contactUsTag = data.context ? data.context.contactUsTag : '';
        self.text = data.description;
        self.categories = data.category;
        self.ownerId = data.ownerId;
        self.queryBlog();
      }
    });
    self.storeService.cart.subscribe((data) => {
      if (data && data.length > 0) {
        self.productNumber = 0;
        for (let item of data) {
          self.productNumber += parseInt(item.number);
        }
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

  queryBlog() {
    if (!this.ownerId) {
      return;
    }
    let options = {
      ownerId: this.ownerId,
      page: 1,
      page_size: 1
    };
    let self = this;
    self.storeService.getBlog(options).then((data) => {
      self.blog = self.blog.concat(data.results);
      if(self.blog.length > 0) {
        self.isHaveBlog = true;
      } else {
        self.isHaveBlog = false;
      }
    });
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }
}
