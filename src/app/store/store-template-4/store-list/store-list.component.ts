import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-shop-template-4-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class StoreListComponent implements OnInit {

  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  public shareLink: string;
  public text = '';
  showButton: boolean = false;

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [];
  date: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
    this.activatedRoute.queryParams.subscribe(params => {
      this.date = parseInt(params['categoryId']);
    });
    let self = this;
    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if (data && !firstLoad) {
        firstLoad = true;
        self.store = data;
        self.text = data.description;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        self.categories = [{name: 'All'}, ...data.category];
        if (!isNaN(self.date)) {
          for (let value of data.category) {
            if (value.id === self.date) {
              self.category = value;
            }
          }
        } else {
          self.category = self.categories[0];
        }
        self.storeService.addStore(data);

        self.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });
        self.queryProduct();
      }
    });
  }

  changeCategory() {
    this.page = 1;
    this.queryProduct(true);
  }

  jumpList(): void {
    this.page++;
    this.queryProduct();
  }

  queryProduct(clearCategory?: boolean) {
    let options = {
      categoryId: this.category.id,
      storeId: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 12
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      if (clearCategory) {
        self.product = [];
        self.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  back(): void {
    this.router.navigate([`./store/${this.store.displayName}`]);
  }
}
