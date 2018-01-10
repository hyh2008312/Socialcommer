import {Component, HostListener, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {Blog, Store} from '../../store';
import {ViewShareScrollDirective} from '../../../shared/directives/view-share-srcoll/view-share-scroll.directive';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';

@Component({
  selector: 'app-shop-template-5-store-blog-detail',
  templateUrl: './store-blog-detail.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class StoreBlogDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  blog: Blog = new Blog;
  isHidden: boolean = true;
  sub: any;
  subOther: any

  store: Store = new Store();
  ownerId: any;
  page = 1;
  bloglist: any = [];
  nextPage: boolean = true;
  id: number;
  @ViewChild(ViewScrollTopDirective) scrollTopDirective: ViewScrollTopDirective;
  constructor(public router: Router,
              private activatedRouter: ActivatedRoute,
              private storeService: StoreService) {
    let self = this;
    this.subOther = this.activatedRouter.params.subscribe(params => {
      console.log(params);
      self.id = params['id'];
      this.storeService.getBlogDetail(self.id).then((data) => {
        self.blog = data;
        self.text = data.title;
        self.storeService.addTitleDescription({
          title: data.title,
          description: data.description,
          shareImage: data.cover
        });

        self.storeService.pageViewBlog({
          viewTime: new Date().getTime(),
          blogId: data.id
        });
      });
    })
  }

  changeIsShowShare(isShowShare: any) {
    this.isHidden = isShowShare;
  }


  ngOnInit(): void {
    this.shareLink = window.location.href;
    let self = this;
    self.sub = this.storeService.store.subscribe((data) => {
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
      page_size: 2
    };
    let self = this;
    self.storeService.getBlog(options).then((data) => {

      if (clearBlog) {
        self.bloglist = [];
        self.nextPage = true;
      }
      self.bloglist = self.bloglist.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  changeScrollToTop(isScroll: any): void {
    this.scrollTopDirective.setScrollTop();
  }
}
