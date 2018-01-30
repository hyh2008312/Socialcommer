import {Component, HostListener, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {Blog, Store} from '../../store';
import {ViewShareScrollDirective} from '../../../shared/directives/view-share-srcoll/view-share-scroll.directive';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';

@Component({
  selector: 'app-shop-template-5-store-blog-detail',
  templateUrl: './store-blog-detail.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreBlogDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  blog: any;
  isHidden: boolean = true;
  sub: any;
  subOther: any

  store: Store = new Store();
  ownerId: any;
  page = 1;
  nextPage: boolean = true;
  id: number;
  bloglist: any = [{
    id: 0,
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/10.jpg',
    context: 'Write an awesome blog to engage your customers and drive traffic to your store!',
  }, {
    id: 1,
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/11.jpg',
    context: 'Write an awesome blog to engage your customers and drive traffic to your store!',
  }, {
    id: 2,
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/14.jpg',
    context: 'Write an awesome blog to engage your customers and drive traffic to your store!',
  }, {
    id: 3,
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/13.jpg',
    context: 'Write an awesome blog to engage your customers and drive traffic to your store!',
  }];

  @ViewChild(ViewShareScrollDirective) shareDirective: ViewShareScrollDirective;

  constructor(public router: Router,
              private activatedRouter: ActivatedRoute,
              private storeService: StoreService) {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.blog = this.bloglist[this.id];
    this.text = this.blog.title;
  }

  changeIsShowShare(isShowShare: any) {
    this.isHidden = isShowShare;
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
  }
}
