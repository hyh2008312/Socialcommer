import {Component, Directive, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store, Product, Image} from '../../store';
import {Subscription} from 'rxjs/Subscription';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';

@Component({
  selector: 'app-shop-template-5-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class StoreDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  store: Store = new Store();
  product: Product = new Product();
  image: any = [];
  selectedImage: any = false;
  imageSources: string[] = [];
  relatedProduct: any = [];
  id: number;
  private sub: Subscription;
  isRequestRelated: boolean = true;
  @ViewChild(ViewScrollTopDirective) scrollTopDirective: ViewScrollTopDirective;

  constructor(public router: Router,
              private activatedRouter: ActivatedRoute,
              private storeService: StoreService) {
    let self = this;
    this.sub = this.activatedRouter.params.subscribe(params => {
      self.id = params['id'];

      this.storeService.store.subscribe((data) => {
        if (data) {
          self.store = data;
          self.initData();
        }
      });
    })


  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initData() {
    let self = this;
    this.storeService.getProduct(self.id).then((data) => {
      self.product = data;
      self.text = data.title;
      self.storeService.addTitleDescription({
        title: data.title,
        description: data.description,
        shareImage: data.imageUrl
      });
      self.image = data.imageUrl;
      self.imageSources = [];
      if (data.imageUrl.length > 0) {
        self.selectedImage = data.imageUrl[0];
        for (let value of data.imageUrl) {
          self.imageSources.push(value);
        }
      }

      self.storeService.pageView({
        pageType: 'product',
        viewTime: new Date().getTime(),
        productId: data.id,
        storeId: data.storeId
      });
      if (self.isRequestRelated) {
        self.queryProduct();
        self.isRequestRelated = false;
      }
    });
  }

  close(): void {
    this.router.navigate([`./store/${this.store.displayName}/4`]);
  }

  openLink() {
    let id = this.activatedRouter.snapshot.params['id'];
    this.storeService.buttonClick({
      viewTime: new Date().getTime(),
      relationId: id,
      storeId: this.store.id
    });
  }

  queryProduct() {
    let options = {
      categoryId: this.product.categoryId,
      storeId: this.store.id,
      relationStatus: 'published',
      page: 1,
      page_size: 12
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      self.relatedProduct = self.relatedProduct.concat(data.results);
    });
  }

  changeScrollToTop(isScroll: any): void {
    this.scrollTopDirective.setScrollTop();
  }
}
