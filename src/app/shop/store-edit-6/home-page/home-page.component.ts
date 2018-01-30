import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-5-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class HomePageComponent implements OnInit {
  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  templateCategories =
    [
      {id: 1, name: 't-shirt'},
      {id: 2, name: 'shoes'},
      {id: 3, name: 'skirt'}
    ];


  public text = '';

  imageBanner: string = 'https://media.socialcommer.com/source/web/template/5/people-2583848.jpg';
  imageAboutCover: string = 'https://media.socialcommer.com/source/web/template/5/people-2593366.jpg';
  imageBlogCover: string = 'https://media.socialcommer.com/source/web/template/5/people-2599856.jpg';


  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;

  blog: any = [{
    id: 1,
    title: 'Top 5 Spiritual Retreats',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/people-2584125.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }, {
    id: 2,
    title: 'Top 5 Spiritual Retreats',
    modified: '2017-12-05T10:08:41.058593Z',
    cover: 'https://media.socialcommer.com/source/web/template/5/people-2603521.jpg',
    context: 'Machine washable sun protection clothing for easy care. Perfect after a jog in the park, hiking, yoga, yard work, or anytime you are out in the sun.',
  }];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    /*this.storeService.store.subscribe((data) => {
      if (data) {
        this.store = data;
        this.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        this.categories = data.category;
        this.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });
      }
    });*/
  }

}
