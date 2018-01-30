import {Component, OnInit, OnDestroy} from '@angular/core';
import {StoreService} from '../../store.service';

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

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.storeName = data.context ? data.context.nameTag : data.name;
        self.contactUsTag = data.context ? data.context.contactUsTag : '';
        self.text = data.description;
        self.categories = data.category;
        self.ownerId = data.ownerId;
        self.queryBlog()
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
      console.log('--length--->' + self.blog.length);
      if (self.blog.length > 0) {
        self.isHaveBlog = true;
      } else {
        self.isHaveBlog = false;
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
}
