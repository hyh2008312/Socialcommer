import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {StoreService} from '../../store.service';

@Component({
  selector: 'app-store-template-3',
  templateUrl: './main-page.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class MainPageComponent implements OnInit {

  storeName: string = '';
  isDialogOpen: boolean = false;
  text: string = '';
  displayName = '';
  productNumber: number = 0;


  ownerId: any;
  blog: any = [];
  isHaveBlog: boolean = true;
  showBlogFlag: number = 1;
  //是否显示根据两者条件
  isBlog: boolean = false;
  categories: any;
  selectCategoryMain: any;
  isHavePromotion:boolean = false ;

  constructor(private router: Router,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.storeName = data.name;
        if (data.context && data.context.blogFlag) {
          self.showBlogFlag = data.context.blogFlag;
        }
        self.isHavePromotion = data.promotionNum > 0;
        let tempCategory = data.category.filter((data) => {
          return data.goodsCount != 0;
        });
        self.categories = tempCategory;
        if (self.categories.length > 0) {
          self.selectCategoryMain = self.categories[0];
        }

        self.text = `Welcome to my store: ${data.name} - ${data.description}`;
        self.displayName = data.displayName;
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

  openDialog(event?: any) {
    if (event) {
      return this.isDialogOpen = false;
    }
    this.isDialogOpen = !this.isDialogOpen;
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

}
