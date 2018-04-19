import {Component, OnInit, OnDestroy} from '@angular/core';
import {StoreService} from '../../store.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop-template-5',
  templateUrl: './main-page.component.html',
  styleUrls: ['../_store-template-6.scss']
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
  displayName: string = '';
  showBlogFlag: number = 1;
  //是否显示根据两者条件
  isBlog: boolean = false;
  isHavePromotion:boolean = false ;
  imageBanner: string = 'https://media.socialcommer.com/source/web/template/6/flowerpots-2754775.png';
  constructor(private storeService: StoreService, private router: Router) {
  }

  ngOnInit(): void {
    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.storeName = data.name;
        self.displayName = data.displayName;
        self.isHavePromotion = data.promotionNum > 0;
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.contactUsTag = data.context ? data.context.contactUsTag : '';
        self.text = `Welcome to my store: ${data.name} - ${data.description}`;

        let banner = data.images ? data.images.imageBanner : self.imageBanner;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: banner
        });

        let tempCategory = data.category.filter((data) => {
          return data.goodsCount != 0;
        });
        self.categories = tempCategory;
        if (data.context && data.context.blogFlag) {
          self.showBlogFlag = data.context.blogFlag;
        }
        self.ownerId = data.ownerId;
        self.queryBlog()
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
      self.isHaveBlog = self.blog.length > 0;
      // 当为1：未设定 2 显示 3 不显示
      if (self.showBlogFlag == 1) {
        self.isBlog = self.isHaveBlog;
      } else if (self.showBlogFlag == 2) {
        self.isBlog = true;
      } else if (self.showBlogFlag == 3) {
        self.isBlog = false;
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
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }
}
