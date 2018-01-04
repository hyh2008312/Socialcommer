import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store, Product, Image } from '../../store';

@Component({
  selector: 'app-store-list-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../../store.scss']
})

export class StoreListDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  store: Store = new Store();
  product: Product = new Product();
  image: any = [];
  selectedImage: any = false;
  imageSources: string[] = [];
  showButton:any = false;

  constructor(
    public router: Router,
    private activatedRouter: ActivatedRoute,
    private storeService: StoreService
  ) {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if(data) {
        self.store = data;
      }
    });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;

    let id = this.activatedRouter.snapshot.params['id'];
    let self = this;
    this.storeService.getProduct(id).then((data) => {
      self.product = data;
      self.text = data.title;
      self.storeService.addTitleDescription({
        title: data.title,
        description: data.description,
        shareImage: data.imageUrl[0]
      });
      self.image = data.imageUrl;
      if(data.imageUrl.length > 0) {
        self.selectedImage = data.imageUrl[0];
        for(let value of data.imageUrl) {
          self.imageSources.push(value);
        }
      }

      self.storeService.pageView({
        pageType: 'Detail',
        viewTime: new Date().getTime(),
        productId: data.id,
        storeId: data.storeId
      });
    });
  }

  scrollChange($event) {
    this.showButton = $event;
  }

  close():void {
    this.router.navigate([`./store/${this.store.displayName}/1/list`]);
  }

  openLink() {
    let id = this.activatedRouter.snapshot.params['id'];
    this.storeService.buttonClick({
      viewTime: new Date().getTime(),
      relationId: id,
      storeId: this.store.id
    });

    //let product:any = this.storeService.getProductInCart(this.store.displayName);
    //
    //let index = product.findIndex((item) => {
    //  if(item.id == this.product.id) {
    //    return true;
    //  }
    //});
    //
    //if(index > -1) {
    //  product[index].number++;
    //} else {
    //  product.unshift({
    //    id : this.product.id,
    //    imageUrl : this.product.imageUrl,
    //    originalPriceAmount : this.product.originalPriceAmount,
    //    originalPriceCurrency : this.product.originalPriceCurrency,
    //    salePriceAmount : this.product.salePriceAmount,
    //    salePriceCurrency : this.product.salePriceCurrency,
    //    number : 1,
    //    title : this.product.title
    //  });
    //}
    //
    //this.storeService.addProductToCart(this.store.displayName, product);
    //
    //this.router.navigate([`./store/${this.store.displayName}/cart`]);
  }

}
