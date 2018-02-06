import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-store-template-2-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class HomePageComponent implements OnInit {
  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  public shareLink: string;
  public text = '';

  baseImageUrl: string = 'https://media.socialcommer.com/source/web/pic/pic-2-1.jpg';

  imageUrlOne: string = 'https://media.socialcommer.com/source/web/pic/pic-2-2.jpg';
  imageHomeMade: string = 'https://media.socialcommer.com/source/web/pic/pic-2-5.jpg';
  imageSubscribe: string = 'https://media.socialcommer.com/source/web/pic/pic-2-11.jpg';
  imageOwnerThree: string = 'https://media.socialcommer.com/source/web/pic/pic-2-3.jpg';
  imageOwnerFour: string = 'https://media.socialcommer.com/source/web/pic/pic-2-4.jpg';
  imageOwnerSix: string = 'https://media.socialcommer.com/source/web/pic/pic-2-6.jpg';
  imageOwnerEleven: string = 'https://media.socialcommer.com/source/web/pic/pic-2-11.jpg';

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [];

  contextList: any = {};
  imageList: any = {};
  ownerId: any;



  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
    let self = this;
    let firstLoad = false;

    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.contextList = data.context ? data.context : {};
        self.imageList = data.images ? data.images : {};
        self.text = data.description;
        self.ownerId = data.ownerId;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        if (data.category.length > 1) {
          self.categories = [{name: 'All'}, ...data.category];
        } else {
          self.categories = [...data.category];
        }
        self.category = self.categories[0];

        self.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });

        self.queryProduct();

      }
    });


  }


  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      return;
    }
    let options = {
      cat: this.category.id,
      store: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 6
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      if (clearProduct) {
        this.product = [];
        this.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  jumpProductList(): void {
    this.router.navigate([`./store/${this.store.displayName}/2/list`]);
  }
}
