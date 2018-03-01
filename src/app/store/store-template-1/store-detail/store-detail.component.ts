import { Component, OnInit, ElementRef,ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store, Product, Image } from '../../store';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../../store.scss']
})

export class StoreDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  currency: string = 'USD';
  store: Store = new Store();
  product: any= {};
  image: any = [];
  selectedImage: any = false;
  imageSources: string[] = [];
  insertImage: any = false;

  variantId: any = '';
  variant: any = {};

  showButton: boolean = false;

  variantList: any = [];

  selectedVariant: any = {};

  salePrice: any = 0;
  originalPrice: any = 0;

  isCanBuy: boolean = false;

  number: any = 1;
  shippingTimeMin: number = 0;
  shippingTimeMax: number = 0;

  constructor(
    public router: Router,
    private activatedRouter: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit():void {
    this.shareLink = window.location.href;

    let id = this.activatedRouter.snapshot.params['id'];
    let self = this;
    this.storeService.store.subscribe((data) => {
      if(data) {
        self.store = data;
        this.storeService.getProduct(id).then((data) => {
          self.product = data;
          let pid = self.product.productId;
          self.storeService.getShippingList({
            cid: self.store.country.id,
            pid
          }).then((data) => {
            let priceItem: any = false;
            for(let item of data[pid]) {
              if(!priceItem) {
                priceItem = item.priceItem;
              }
              if(priceItem >= item.priceItem) {
                self.shippingTimeMax = item.shippingTimeMax;
                self.shippingTimeMin = item.shippingTimeMin;
                priceItem = item.priceItem;
              }
            }
          });
          self.text = data.title;
          self.storeService.addTitleDescription({
            title: data.title,
            description: data.description,
            shareImage: data.images[0]
          });

          self.image = data.images;
          if(data.images.length > 0) {
            self.selectedImage = data.images[0];
            for(let value of data.images) {
              self.imageSources.push(value);
            }
          }

          self.arrangeVariant(data);

          self.variantId = data.variants[0].id;
          self.variant = data.variants[0];
          self.isCanBuy = data.variants[0].isCanBuy;

          self.salePrice = data.salePrice;
          self.originalPrice = data.originalPrice;

          self.storeService.pageView({
            pt: 'goods',
            vt: new Date().getTime(),
            gid: data.id,
            pid: data.productId,
            suid: data.supplierId,
            sid: data.storeId
          });
        });

      }
    });

  }

  scrollChange($event) {
    this.showButton = $event;
  }

  close():void {
    this.router.navigate([`./store/${this.store.displayName}/1`]);
  }

  openLink() {
    let id = this.activatedRouter.snapshot.params['id'];
    this.storeService.buttonClick({
      viewTime: new Date().getTime(),
      relationId: id,
      storeId: this.store.id
    });

    let product:any = this.storeService.getProductInCart(this.store.displayName);

    let index = product.findIndex((item) => {
      if(item.variantId == this.variantId) {
        return true;
      }
    });

    if(index > -1) {
      product[index].number += this.number;
    } else {
      product.unshift({
        id : this.product.productId,
        imageUrl : this.insertImage? this.insertImage: this.imageSources[0],
        originalPriceAmount : this.originalPrice,
        originalPriceCurrency : this.currency,
        salePriceAmount : this.salePrice,
        salePriceCurrency : this.currency,
        variant: this.variant,
        number : this.number,
        variantId: this.variantId,
        title : this.product.title
      });
    }

    this.storeService.addProductToCart(this.store.displayName, product);

    //this.router.navigate([`./store/${this.store.displayName}/cart`]);
  }

  arrangeVariant(data) {
    for(let item of data.attributes) {
      let variant:any = {};
      variant.id = item.id;
      variant.name = item.name;
      variant.value = [];
      this.selectedVariant[item.id] = false;
      for(let i of data.variants) {
        for(let j of i.attributeValues) {
          if(j.attributeId == variant.id ) {
            let index =  variant.value.findIndex((data) => {
              if(data.value == j.value) {
                return true;
              }
            });
            if(index == -1) {
              let obj = {
                image: variant.id == 2 ? i.mainImage: false,
                value: j.value,
                isSelected: false
              };
              variant.value.push(obj);
            } else {
              break;
            }
          }
        }
      }
      this.variantList.push(variant);
    }
  }

  selectVariant(value, item) {
    let isSelected = value.isSelected;
    for(let itm of item.value) {
      itm.isSelected = false;
    }
    value.isSelected = !isSelected;
    let id = item.id;
    if(value.isSelected) {
      if(id == 2) {
        this.insertImage = value.image;
      }
      this.selectVariant[id] = value.value;
      if(this.checkIsVariant()) {
        this.variantId = this.checkIsVariant()[0].id;
        this.salePrice = this.checkIsVariant()[0].saleUnitPrice;
        this.originalPrice = this.checkIsVariant()[0].unitPrice;
        this.isCanBuy = this.checkIsVariant()[0].isCanBuy;
        this.variant = this.checkIsVariant()[0];
      } else {
        this.variantId = this.product.variants[0].id;
        this.salePrice = this.product.salePrice;
        this.originalPrice = this.product.originalPrice;
        this.isCanBuy = this.product.variants[0].isCanBuy;
        this.variant = this.product.variants[0];
      }
    } else {
      if(id == 2) {
        this.insertImage = null;
      }
      this.selectVariant[id] = false;
      this.variantId = this.product.variants[0].id;
      this.salePrice = this.product.salePrice;
      this.originalPrice = this.product.originalPrice;
      this.isCanBuy = this.product.variants[0].isCanBuy;
      this.variant = this.product.variants[0];
    }

  }

  checkIsVariant() {
    let variant = [...this.product.variants];
    for(let prop in this.selectedVariant) {
      if(!this.selectVariant[prop]) {
        return false;
      }
      let item = this.selectVariant[prop];
      for(let i of this.product.variants) {
        let isDelete = true;
        for(let j of i.attributeValues) {
          if(j.attributeId == parseInt(prop) && item == j.value) {
            isDelete = false;
            break;
          }
        }
        if(isDelete) {
          let id = i.id;
          let index = variant.findIndex((data) => {
            if(data.id == id) {
              return true;
            }
          });
          if(index > -1) {
            variant.splice(index, 1);
          }
        }
      }
    }
    return variant;
  }

  minusNumber() {
    if(this.number > 1) {
      this.number--;
    }
  }

  plusNumber() {
    this.number++;
  }
}
