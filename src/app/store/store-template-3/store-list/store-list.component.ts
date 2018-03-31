import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-store-template-3-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['../_store-template-3.scss']
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
  currency: string = 'USD';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
    let self = this;
    let firstLoad = false;
    this.storeService.store.subscribe((data) => {
      if (data && !firstLoad) {
        firstLoad = true;
        self.store = data;
        self.text = data.description;
        self.currency = data.currency.toUpperCase();
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });
        let tempCategory = data.category.filter((data)=>{
          return data.goodsCount !=0 ;
        });
        self.categories = [{name: 'All'}, ...tempCategory];
        self.category = self.categories[0];
        self.storeService.addStore(data);

        self.storeService.pageView({
          pt: 'store',
          vt: new Date().getTime(),
          sid: data.id
        });

        self.queryProduct();
      }
    });
  }

  scrollChange($event) {
    this.showButton = $event;
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
      cat: this.category.id,
      store: this.store.id,
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
