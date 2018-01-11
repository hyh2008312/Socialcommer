import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-shop-template-5-store-blog',
  templateUrl: './store-blog.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class StoreBlogComponent implements OnInit {
  @Input() storeName: string;
  public shareLink: string;
  public text: string;
  blog: any = [{
    id: 0,
    title: 'Top 5 Spiritual Retreats',
    authorFirstName:'Richard Davies',
    vcount: 23,
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/people-2584125.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 1,
    title: 'Top 5 Spiritual Retreats',
    authorFirstName:'Richard Davies',
    vcount: 23,
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/people-2603521.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 2,
    title: 'Top 5 Spiritual Retreats',
    authorFirstName:'Richard Davies',
    vcount: 23,
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/two-girls-1828539.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }];

  constructor() {
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }
}
