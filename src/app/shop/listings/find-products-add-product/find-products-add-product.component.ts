import {Component, OnInit, OnDestroy, ViewChild, NgZone, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ShopService} from '../shop.service';
import {ViewScrollTopDirective} from '../../../shared/directives/view-scroll-top/view-scroll-top.directive';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-find-products-add-product',
  templateUrl: './find-products-add-product.component.html',
  styleUrls: ['./_find-products-add-product.scss']
})

export class FindProductsAddProductComponent implements OnInit, AfterViewInit {

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

  // 活动是否开始和是否结束
  isPromotionOnGoing: boolean = false;
  isPromotionScheduled: boolean = false;

  sub: any;
  storeSub: any;
  @ViewChild(ViewScrollTopDirective) scrollTopDirective: ViewScrollTopDirective;

  countryId: number = 1;

  country: string = '';

  countdownLeftTime: number = 0;
  progressPercentage: number = 0;

  discount: any = 0;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private shopService: ShopService,
              private userService: UserService,
              private ngZone: NgZone) {
    let self = this;
    if (self.activatedRoute.parent.snapshot.params['supplierId']) {
      this.isSupplierDetail = true;
    }
    this.sub = this.activatedRoute.params.subscribe((data) => {
      if (data) {
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
          if (self.image.length > 0) {
            self.selectedImage = self.image[0];
            self.imageSources = [...data.images];
          }
          self.isAdded = data.hasInStore;
          self.isPromotionOnGoing = false;
          self.isPromotionScheduled = false;
          if (self.product.promotionOngoing) {
            self.isPromotionOnGoing = true;
            self.progressPercentage = self.product.promotionOngoing.saleRatio;
            self.discount = self.product.promotionOngoing.discount / 100;
            self.countdownLeftTime = self.product.promotionOngoing.endTimestamp * 1000;
          } else if (self.product.promotionScheduled) {
            self.isPromotionScheduled = true;
            self.discount = self.product.promotionScheduled.discount / 100;
            self.countdownLeftTime = self.product.promotionScheduled.startTimestamp * 1000;
          }
          self.supplierName = data.supplierName;
          self.description = data.description;
          self.variantList = [];
          self.isHaveVariant = data.attributes.length > 0;
          if (self.isHaveVariant) {
            self.arrangeVariant(data);
          } else {
            self.variantId = self.product.variants[0].id;
            self.salePrice = self.product.saleUnitPrice;
            self.originalPrice = self.product.unitPrice;
            self.variant = self.product.variants[0];
          }
          if (self.discount != 0) {
            self.salePrice = self.salePrice * self.discount;
          }

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
      if (data) {
        this.countryId = data.country.id;
        this.currency = data.currency.toUpperCase();
        this.country = data.country.name;
        this.changeShipping(this.countryId);
      }
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.storeSub.unsubscribe();
  }

  changeTab($event) {
    this.tabNumber = $event;
  }

  close(): void {
    if (!this.isSupplierDetail) {
      this.router.navigate(['/shop/listings/items/']);
    } else {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/`])
    }

  }

  addEdit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    if (!this.isSupplierDetail) {
      this.router.navigate([`/shop/listings/items/${id}/preview`]);
    } else {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/${id}/preview`]);
    }

  }

  shareToEarn() {
    let id = this.activatedRoute.snapshot.params['id'];
    if (this.isSupplierDetail) {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/${id}/share/`]);
    } else {
      this.router.navigate([`/shop/listings/items/${id}/share/`]);
    }
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

      if (this.discount != 0) {
        this.minSalePrice = this.salePriceList[0] * this.discount;
        this.maxSalePrice = this.salePriceList[this.salePriceList.length - 1] * this.discount;
      }
    }

  }

  selectVariant(value, item) {
    let self = this;
    let isSelected = value.isSelected;
    for (let itm of item.value) {
      itm.isSelected = false;
    }
    value.isSelected = !isSelected;
    let id = item.id;
    if (value.isSelected) {
      if (id == 2) {
        this.insertImage = value.image;
      }
      this.selectVariant[id] = value.value;
      let mVariant = this.checkIsVariant();
      if (mVariant && mVariant.length > 0) {
        this.variantId = mVariant[0].id;
        this.salePrice = mVariant[0].saleUnitPrice;
        this.originalPrice = mVariant[0].unitPrice;
        this.variant = mVariant[0];
        this.commission = this.salePrice * this.commissionRate / 100;
      } else {
        this.variantId = this.product.variants[0].id;
        this.salePrice = this.product.saleUnitPrice;
        this.originalPrice = this.product.unitPrice;
        this.variant = this.product.variants[0];
        this.commission = this.salePrice * this.commissionRate / 100;
      }

    } else {
      if (id == 2) {
        this.insertImage = null;
      }
      this.selectVariant[id] = false;
      this.variantId = this.product.variants[0].id;
      this.salePrice = this.product.saleUnitPrice;
      this.originalPrice = this.product.unitPrice;
      this.variant = this.product.variants[0];
      this.commission = this.salePrice * this.commissionRate / 100;
    }

    //显示价格
    if (this.discount != 0) {
      this.salePrice = this.salePrice * this.discount;
      this.commission = this.commission * this.discount;
    }
    //判断有没有选择变体（两者）
    let count = 0;
    for (let item of this.variantList) {
      if (item.name == 'Size') {
        this.isSelectSize = false;
        for (let i of item.value) {
          if (i.isSelected) {
            count++;
            this.isSelectSize = true;
            break;
          }
        }
      } else if (item.name == 'Color') {
        this.isSelectColor = false;
        for (let i of item.value) {
          if (i.isSelected) {
            count++;
            this.isSelectColor = true;
            break;
          }
        }
      }
    }
    // 判断是否显示价格范围
    this.isPriceRange = !(count == this.variantList.length);


  }

  checkIsVariant() {
    let variant = [...this.product.variants];
    for (let prop in this.selectedVariant) {
      if (!this.selectVariant[prop]) {
        return false;
      }
      let item = this.selectVariant[prop];
      for (let i of this.product.variants) {
        let isDelete = true;
        for (let j of i.attributeValues) {
          if (j.attributeId == parseInt(prop) && item == j.value) {
            isDelete = false;
            break;
          }
        }
        if (isDelete) {
          let id = i.id;
          let index = variant.findIndex((data) => {
            if (data.id == id) {
              return true;
            }
          });
          if (index > -1) {
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

  endDate = new Date(2018, 3, 12, 19, 26, 0, 123);
}
