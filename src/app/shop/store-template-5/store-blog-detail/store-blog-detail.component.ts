import {Component, HostListener, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {Blog, Store} from '../../store';

@Component({
  selector: 'app-shop-template-5-store-blog-detail',
  templateUrl: './store-blog-detail.component.html',
  styleUrls: ['../store-template-5.scss']
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
    title: 'Top 5 Spiritual Retreats',
    authorFirstName: 'Richard Davies',
    vcount: 23,
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/people-2584125.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 1,
    title: 'Top 5 Spiritual Retreats',
    authorFirstName: 'Richard Davies',
    vcount: 23,
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/people-2603521.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 2,
    title: 'Top 5 Spiritual Retreats',
    authorFirstName: 'Richard Davies',
    vcount: 23,
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/two-girls-1828539.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }];


  constructor(public router: Router,
              private activatedRouter: ActivatedRoute,
              private storeService: StoreService) {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.blog = this.bloglist[this.id];
    this.text = this.blog.title;
  }


  ngOnInit(): void {
    this.shareLink = window.location.href;
  }
}
