import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-5-store-blog',
  templateUrl: './store-blog.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreBlogComponent implements OnInit {

  store: Store = new Store();
  ownerId: any;
  page = 1;
  blog: any = [];
  nextPage: boolean = false;

  //判断是否有blog
  isBlog: boolean = false;

  constructor(private storeService: StoreService) {

  }

  ngOnInit(): void {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.ownerId = data.ownerId;
        self.queryBlog();
      }
    });
  }

  queryBlog(clearBlog?: boolean) {
    if (!this.ownerId) {
      return;
    }
    let options = {
      ownerId: this.ownerId,
      page: this.page,
      page_size: 6
    };
    let self = this;
    self.storeService.getBlog(options).then((data) => {

      if (clearBlog) {
        self.blog = [];
        self.nextPage = true;
      }
      self.blog = self.blog.concat(data.results);
      self.isBlog = self.blog.length == 0;
      if (data.next == null) {
        self.nextPage = false;
      } else {
        self.nextPage = true;
      }
    });
  }

  jumpList(): void {
    this.page++;
    this.queryBlog();
  }
}
