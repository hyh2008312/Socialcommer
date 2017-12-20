import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-shop-template-4-store-blog',
  templateUrl: './store-blog.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class StoreBlogComponent implements OnInit {
  @Input() storeName: string;
  public shareLink: string;
  public text: string;

  blog: any = [{
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/10.jpg',
    context: 'Blog Description',
  }, {
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/11.jpg',
    context: 'Blog Description ',
  }, {
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/14.jpg',
    context: 'Blog Description',
  }, {
    title: 'Blog Title',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/4/13.jpg',
    context: 'Blog Description',
  }];

  constructor() {
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }
}
