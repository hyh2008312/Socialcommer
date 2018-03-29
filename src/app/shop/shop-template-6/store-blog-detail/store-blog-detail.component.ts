import {Component, HostListener, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {Blog, Store} from '../../store';

@Component({
  selector: 'app-shop-template-6-store-blog-detail',
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
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/10430_z,0.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 1,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/12866_z,0.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 2,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/13389_z,0.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 3,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/13427_z.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 4,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/6179_z.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 5,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/6290_z,1.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 6,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/bertoia-diamond-chair.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 7,
    title: 'FLORENCE KNOLL IN METROPOLIS MAGAZINE',
    modified: '2017-12-25T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/6/florence-knoll-sofa-barcelona-coffee-table-5616_z.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }
  ];


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
