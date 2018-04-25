import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ShopService} from '../shop.service';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-product-to-cart',
  templateUrl: './product-to-cart.component.html',
  styleUrls: ['../_shop.scss', './_product-to-cart.scss']
})

export class ProductToCartComponent implements OnInit {

  store: any;
  product: any = {};
  variantId: any = '';
  variant: any = {};
  selectedVariant: any = {};
  variantList: any = [];
  // 是否有变体
  isHaveVariant: boolean = false;
  insertImage: any = false;
  isSelectSize: boolean = false;
  isSelectColor: boolean = false;

  // 不能添加购物车时的提示
  cartWarn: string = '';
  isShowCartWarn: boolean = false;
  // 选择的变体是否有效
  isSelectInvalid: boolean = false;
  number: any = 1;

  isSupplierEdit = false;

  sub: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    if (this.activatedRoute.parent.snapshot.params['supplierId']) {
      this.isSupplierEdit = true;
    }
    let self = this;
    self.shopService.getSupplyProductDetail({id}).then((data) => {
      self.product = data;
      self.isHaveVariant = data.attributes.length > 0;
      if (self.isHaveVariant) {
        self.arrangeVariant(data);
      } else {
        self.variantId = self.product.variants[0].id;
        self.variant = self.product.variants[0];
      }
    });

    self.sub = self.userService.store.subscribe((data) => {
      if(data) {
        self.store = data;
      }
    })
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
        this.variant = mVariant[0];
      } else {
        this.variantId = this.product.variants[0].id;
        this.variant = this.product.variants[0];
      }

    } else {
      if (id == 2) {
        this.insertImage = null;
      }
      this.selectVariant[id] = false;
      this.variantId = this.product.variants[0].id;
      this.variant = this.product.variants[0];
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


  openLink() {
    // 2类变体
    if (this.variantList.length === 2) {
      if (!this.isSelectSize) {
        this.cartWarn = 'Please select a size.';
        this.isShowCartWarn = true;
        return;
      }
      if (!this.isSelectColor) {
        this.isShowCartWarn = true;
        this.cartWarn = 'Please select a color.';
        return;
      }
    }
    // 1类变体
    if (this.variantList.length === 1) {
      if (this.variantList[0].name == 'Size') {
        if (!this.isSelectSize) {
          this.cartWarn = 'Please select a size.';
          this.isShowCartWarn = true;
          return;
        }
      } else if (this.variantList[0].name == 'Color') {
        if (!this.isSelectColor) {
          this.cartWarn = 'Please select a color.';
          this.isShowCartWarn = true;
          return;
        }
      }
    }

    if (this.isSelectInvalid) {
      this.cartWarn = 'Oops! This option is currently unavailable. Please choose another option!';
      this.isShowCartWarn = true;
      return;
    }

    let param = {
      quantity: this.number,
      variantId: this.variantId
    };
    this.addToCart(param);
  }

  addToCart(param: any): void {
    let self = this;
    self.shopService.addToCart(param).then((data) => {
      self.store.cartProductNum = data.cartProductNum;
      self.store.isOnAddToCart = true;
      self.userService.addCartNumber(self.store);
      self.close();
    });
  }

  minusNumber() {
    if (this.number > 1) {
      this.number--;
    }
  }

  plusNumber() {
    this.number++;
  }

  close(): void {
    if (!this.isSupplierEdit) {
      this.router.navigate(['/shop/listings/items/']);
    } else {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/`]);
    }
  }
}
