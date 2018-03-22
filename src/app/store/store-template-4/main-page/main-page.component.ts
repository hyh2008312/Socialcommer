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
  displayName: string;


  ownerId: any;
  blog: any = [];
  isHaveBlog: boolean = true;
  showBlogFlag: number = 1;
  //是否显示根据两者条件
  isBlog: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private router: Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.storeName = data.context ? data.context.nameTag : data.name;
        self.text = data.description;
        self.displayName = data.displayName;
        if (data.context && data.context.blogFlag) {
          self.showBlogFlag = data.context.blogFlag;
        }
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
        if (self.blog.length > 0) {
          self.isHaveBlog = true;
        } else {
          self.isHaveBlog = false;
        }
        // 当为1：未设定 2 显示 3 不显示
        if (self.showBlogFlag == 1) {
          self.isBlog = self.isHaveBlog;
        } else if (self.showBlogFlag == 2) {
          self.isBlog = true;
        } else if (self.showBlogFlag == 3) {
          self.isBlog = false;
        }
      }
    );
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
