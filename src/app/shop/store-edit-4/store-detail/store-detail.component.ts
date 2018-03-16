import {Component, Directive, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';
import {UserService} from "../../../shared/services/user/user.service";
import {ShopService} from "../../shop.service";
import {StoreService} from "../../store.service";

@Component({
  selector: 'app-shop-template-4-store-edit-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../../../store/store-template-4/_store-template-4.scss']
})

export class StoreDetailComponent implements OnInit {

  public shareLink: string;
  public text = '';
  store: any;
  product: any;
  image: any = [];
  selectedImage: any = false;
  imageSources: string[] = [];
  relatedProduct: any = [];
  relatedProductList: any = [];
  id: number;
  private sub: Subscription;
  isRequestRelated: boolean = true;


  // 购物车所需要的参数
  currency: string = 'USD';
  insertImage: any = false;
  variantId: any = '';
  variant: any = {};
  variantList: any = [];
  selectedVariant: any = {};
  salePrice: any = 0;
  originalPrice: any = 0;
  isCanBuy: boolean = true;
  number: any = 1;
  shippingTimeMin: number = 0;
  shippingTimeMax: number = 0;


  //变体的改版
  minSalePrice: number = 0;
  maxSalePrice: number = 0;
  //保存价格的列表（按照顺序）
  salePriceList: any = [];
  isSelectSize: boolean = false;
  isSelectColor: boolean = false;
  isPriceRange: boolean = true;
  // 不能添加购物车时的提示
  cartWarn: string = '';
  isShowCartWarn: boolean = false;
  // 选择的变体是否有效
  isSelectInvalid: boolean = false;
  // 是否有变体
  isHaveVariant: boolean = false;
  //链接上的店铺的名称
  displayName: string = '';


//退换货的天数
  returnDays: string = '30 day returns';

  //快递的国家
  deliveryCountry: string = 'United States';
  @Input() productId: number;
  @Output() public closeDetail: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService,
              private storeService: StoreService,
              private shopService: ShopService) {


  }

  ngOnChanges() {
    if (this.productId) {
      this.queryDetail();
    }
  }


  ngOnInit(): void {
    this.shareLink = window.location.href;


  }

  queryDetail() {
    let self = this;
    this.userService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.currency = data.currency.toUpperCase();
        self.displayName = data.displayName;
        let countryCode = data.country.code;
        if (countryCode == 'US') {
          self.returnDays = '30 day returns';
          self.deliveryCountry = 'United States';
        } else if (countryCode == 'IN') {
          self.returnDays = '10 day returns';
          self.deliveryCountry = 'India';
        }
        let storeId = data.id;

        this.shopService.getProductDetail(this.productId).then((data) => {
          self.product = data;
          let pid = self.product.productId;
          self.shopService.getShippingList({
            cid: self.store.country.id,
            pid
          }).then((data) => {
            let priceItem: any = false;
            for (let item of data[pid]) {
              if (!priceItem) {
                priceItem = item.priceItem;
              }
              if (priceItem >= item.priceItem) {
                self.shippingTimeMax = item.shippingTimeMax;
                self.shippingTimeMin = item.shippingTimeMin;
                priceItem = item.priceItem;
              }
            }
          });
          self.text = data.title;
          self.image = data.images;
          if (data.images.length > 0) {
            self.selectedImage = data.images[0];
            for (let value of data.images) {
              self.imageSources.push(value);
            }
          }

          this.isHaveVariant = data.attributes.length > 0;
          if (this.isHaveVariant) {
            self.arrangeVariant(data);
          } else {
            this.variantId = this.product.variants[0].id;
            this.salePrice = this.product.salePrice;
            this.originalPrice = this.product.originalPrice;
            this.isCanBuy = this.product.variants[0].isCanBuy;
            this.variant = this.product.variants[0];
          }
          if (self.isRequestRelated) {
            self.queryProduct();
            self.isRequestRelated = false;
          } else {
            if (self.relatedProductList.length > 0) {
              self.relatedProduct = self.relatedProductList.filter((data) => {
                return self.productId != data.id;
              });
            }
          }
        });

      }
    });
  }


  queryProduct() {
    let options = {
      cat: this.product.categoryId,
      store: this.store.id,
      relationStatus: 'published',
      page: 1,
      page_size: 12
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      if (data.count > 1) {
        self.relatedProductList = data.results;
        self.relatedProduct = data.results.filter((data) => {
          return self.productId != data.id;
        });
      }
    });
  }

  arrangeVariant(data) {
    for (let item of data.attributes) {
      let variant: any = {};
      variant.id = item.id;
      variant.name = item.name;
      variant.value = [];
      this.selectedVariant[item.id] = false;
      for (let i of data.variants) {
        for (let j of i.attributeValues) {
          if (j.attributeId == variant.id) {
            let index = variant.value.findIndex((data) => {
              if (data.value == j.value) {
                return true;
              }
            });
            if (index == -1) {
              let obj = {
                image: variant.id == 2 ? i.mainImage : false,
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
    // 对价格进行排序为了筛选最低价和最高价
    if (data.variants) {
      let list = data.variants.map((data) => {
        return parseFloat(data.saleUnitPrice);
      });
      this.salePriceList = list.sort(function (x, y) {
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.minSalePrice = this.salePriceList[0];
      this.maxSalePrice = this.salePriceList[this.salePriceList.length - 1];
    }
  }


  changeViewIndex(index: number) {
    this.closeDetail.emit(index);
  }

}