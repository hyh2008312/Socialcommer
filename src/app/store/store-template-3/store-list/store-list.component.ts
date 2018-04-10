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

  id: number;
  categoryName: string;
  sub: any;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {
    // 1.可以通过id去和分类列表进行对比 2.可以用请求下来的商品中的categoryName的名字
    let self = this;
    self.sub = this.activatedRoute.params.subscribe(params => {
      self.id = parseInt(params['id']);
      if (self.store.id) {
        self.categoryName = self.getCategoryName();
        self.changeCategory();
      } else {
        self.storeService.store.subscribe((data) => {
          if (data) {
            self.store = data;
            self.text = data.description;
            self.currency = data.currency.toUpperCase();
            self.storeService.addTitleDescription({
              title: data.name,
              description: data.description,
              shareImage: data.imageUrl
            });
            self.storeService.pageView({
              pt: 'store',
              vt: new Date().getTime(),
              sid: data.id
            });
            self.categoryName = self.getCategoryName();
            self.queryProduct();
          }
        });
      }
    });
  }

  ngOnInit(): void {

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
      cat: this.id,
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

  getCategoryName(): string {
    for (let index = 0; index < this.store.category.length; index++) {
      if (this.id === this.store.category[index].id) {
        return this.store.category[index].name;
      }
    }
    return '';
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
