import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ShopService } from '../shop.service';
import { RecommendProduct, Image, OriginalPrice, SalePrice} from '../shop';
import { ViewScrollTopDirective } from '../../shared/directives/view-scroll-top/view-scroll-top.directive';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-find-products-add-product',
  templateUrl: './find-products-add-product.component.html',
  styleUrls: ['../../store/store.scss', './_find-products-add-product.scss']
})

export class FindProductsAddProductComponent implements OnInit {

  product: any = {};
  // Product list
  productList: any = false;

  category: any;
  originalPrice: any = 0;
  salePrice: any = 0;
  supplierName: string = '';
  currency: string = 'USD';
  image: any = [];
  selectedImage: any = '';
  imageSources: string[] = [];
  description: any = false;
  commission: any = 0;
  commissionRate: any = 0;

  insertImage: any = false;
  variantId: any = '';
  variant: any = {};
  selectedVariant: any = {};
  variantList: any = [];
  shipping: any[] = [];

  isAdded: boolean = false;

  tabNumber: number = 0;

  isSupplierDetail: boolean = false;

  sub: any;
  storeSub: any;
  @ViewChild(ViewScrollTopDirective) scrollTopDirective: ViewScrollTopDirective;

  countryId: number = 1;

  country: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private userService: UserService
  ) {
    let self = this;
    if(self.activatedRoute.parent.snapshot.params['supplierId']) {
      this.isSupplierDetail = true;
    }
    this.sub =this.activatedRoute.params.subscribe((data) => {
      if(data) {
        let id = self.activatedRoute.snapshot.params['id'];

        self.shopService.getSupplyProductDetail({id}).then((data) => {
          self.scrollTopDirective.setScrollTop();
          self.product = data;
          self.commissionRate = data.commissionRate;
          self.category = data.categories[0].name;
          self.salePrice = data.saleUnitPrice;
          self.originalPrice = data.unitPrice;
          self.commission = self.salePrice * self.commissionRate / 100;
          self.image = [...data.images];
          if(self.image.length > 0) {
            self.selectedImage = self.image[0];
            self.imageSources = [...data.images];
          }

          self.isAdded = data.hasInStore;

          self.supplierName = data.supplierName;
          self.description = data.description;

          this.variantList = [];
          self.arrangeVariant(data);

          self.variantId = data.variants[0].id;
          self.variant = data.variants[0];

          let pid = data.id;
          self.shopService.getSupplyProductRecommendList({
            pid
          }).then((data) => {

            self.productList = data;
          });

        });
      }
    });

    this.storeSub = this.userService.store.subscribe((data) => {
      if(data) {
        this.countryId = data.country.id;
        this.currency = data.currency.toUpperCase();
        this.country = data.country.name;
        this.changeShipping(this.countryId);
      }
    });
  }

  ngOnInit():void {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.storeSub.unsubscribe();
  }

  changeTab($event) {
    this.tabNumber = $event;
  }

  close():void {
    if(!this.isSupplierDetail) {
      this.router.navigate(['/shop/listings/items/']);
    } else {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/`])
    }

  }

  addEdit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    if(!this.isSupplierDetail) {
      this.router.navigate([`/shop/listings/items/${id}/preview`]);
    } else {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/${id}/preview`]);
    }

  }

  getLowestPrice(variants): any {
    let price: any = {
      saleUnitPrice : variants[0],
      unitPrice : variants[0]
    };

    let unitPriceArray = [];

    for(let i=0;i<variants.length;i++){
      if(variants[i].saleUnitPrice <=  price.saleUnitPrice){
        price.saleUnitPrice = variants[i].saleUnitPrice;
      }
    }

    for(let value of variants) {
      if(value.saleUnitPrice == price.saleUnitPrice) {
        unitPriceArray.push(value.unitPrice);
      }
    }

    for(let value of unitPriceArray) {
      if(value <=  price.unitPrice){
        price.unitPrice = value;
      }
    }

    return price;
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
        this.variant = this.checkIsVariant()[0];
        this.commission = this.salePrice * this.commissionRate / 100;
      } else {
        this.variantId = this.product.variants[0].id;
        this.salePrice = this.product.saleUnitPrice;
        this.originalPrice = this.product.unitPrice;
        this.variant = this.product.variants[0];
        this.commission = this.salePrice * this.commissionRate / 100;
      }
    } else {
      if(id == 2) {
        this.insertImage = null;
      }
      this.selectVariant[id] = false;
      this.variantId = this.product.variants[0].id;
      this.salePrice = this.product.saleUnitPrice;
      this.originalPrice = this.product.unitPrice;
      this.variant = this.product.variants[0];
      this.commission = this.salePrice * this.commissionRate / 100;
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

  changeShipping($event) {
    let pid = this.activatedRoute.snapshot.params['id'];
    let obj = {
      cid: $event,
      pid
    };

    this.shopService.getShippingList(obj).then((data) => {
      this.shipping = [...data[pid]];
    });
  }
}
