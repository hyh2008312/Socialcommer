import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ENTER } from '@angular/cdk/keycodes';

import { ShopService } from '../shop.service';
import { Product, StoreProduct } from '../shop';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-catalog-edit-product',
  templateUrl: './catalog-edit-product.component.html',
  styleUrls: ['../../store/store.scss','../shop.scss']
})

export class CatalogEditProductComponent implements OnInit {

  productForm : FormGroup;
  previewImgFile: any[] = [];
  previewImgSrcs: any[] = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  relationId: number;

  // Editor
  public editor;
  public editorContent = "insert content...";

  // Enter, comma
  separatorKeysCodes = [ENTER, 188];
  tags = [];

  storeId: number;
  storeCurrency: string = 'USD';

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public shopService: ShopService,
    public userService: UserService,
    private activatedRoute : ActivatedRoute
  ) {

    this.productForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      salePrice: ['', [
        Validators.required
      ]],
      originalPrice: ['', [
        Validators.required
      ]],
      purchaseUrl: ['', [
        Validators.required
      ]],
      recommendation: ['', [
        Validators.required,
        Validators.maxLength(1000)
      ]]
    });

    this.productForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //存储错误信息
  formErrors = {
    'title': '',
    'tags': '',
    'salePrice':'',
    'originalPrice': '',
    'purchaseUrl': '',
    'recommendation': ''
  };
  //错误对应的提示
  validationMessages = {
    'title': {
      'required': 'Title is required.'
    },
    'tags': {
      'required': 'Tag is required.'
    },
    'salePrice':{
      'required': 'Sale price is required.'
    },
    'originalPrice':{
      'required': 'Original price is required.'
    },
    'purchaseUrl': {
      'required': 'Purchase url price is required.'
    },
    'recommendation':{
      'required': 'Recommendation is required.',
      'maxlength' : 'Recommendation contain 1000 characters at most.'
    }
  };

  ngOnInit() {
    let self = this;
    let firstLoad = false;
    self.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;
        self.storeCurrency = data.currency;
        if(!firstLoad) {
          firstLoad = true;

          let id = self.activatedRoute.snapshot.params['id'];
          self.shopService.getProduct(id).then((data) => {

            let tagArr = data.tags.split(',');
            for(let value of tagArr) {

              self.tags.push({
                name: value
              });
            }
            self.productForm.setValue({
              title: data.title,
              salePrice: data.salePriceAmount,
              originalPrice: data.originalPriceAmount,
              purchaseUrl: data.purchaseUrl,
              recommendation: data.recommendation
            });

            for(let value of data.imageUrl) {
              self.previewImgFile.push(value.id);
              self.previewImgSrcs.push(value.url);
            }

            self.relationId = data.id;

            self.editorContent = data.description;
          })

        }
      }
    });
  }

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.productForm.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
          break;
        }
      }
    }

  }



  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  close():void {
    this.router.navigate(['/shop/listings']);
  }

  create() {
    if(!this.productForm.valid) {
      return;
    }
    let id = parseInt(this.activatedRoute.snapshot.params['id']);

    let productForm = this.productForm.value;

    let storeProduct = new StoreProduct();
    storeProduct.id = this.relationId;
    storeProduct.productId = id;
    storeProduct.purchaseUrl = productForm.purchaseUrl;
    storeProduct.storeId = this.storeId;
    storeProduct.isCustomer = false;
    storeProduct.recommendation = productForm.recommendation;
    storeProduct.isDraft = false;

    let product = new Product();

    storeProduct.product = product;
    storeProduct.product.description = this.editorContent;
    storeProduct.product.title = productForm.title;
    storeProduct.product.images = this.previewImgFile;
    storeProduct.product.originalPrice = {
      amount:  productForm.originalPrice,
      currency: this.storeCurrency
    };
    storeProduct.product.salePrice = {
      amount: productForm.salePrice,
      currency: this.storeCurrency
    };

    storeProduct.product.isDraft = false;

    let tagArr = [];
    for(let value of this.tags) {
      tagArr.push(value.name);
    }
    storeProduct.product.tags = tagArr.join(',');

    let self = this;
    this.shopService.changeProduct(storeProduct).then((data) => {
      self.close();
    });
  }

  createDraft() {
    let productForm = this.productForm.value;
    let id = parseInt(this.activatedRoute.snapshot.params['id']);

    let storeProduct = new StoreProduct();
    storeProduct.id = this.relationId;
    storeProduct.productId = id;
    storeProduct.purchaseUrl = productForm.purchaseUrl;
    storeProduct.storeId = this.storeId;
    storeProduct.isCustomer = false;
    storeProduct.recommendation = productForm.recommendation;
    storeProduct.isDraft = false;

    let product = new Product();

    storeProduct.product = product;
    storeProduct.product.description = this.editorContent;
    storeProduct.product.title = productForm.title;
    storeProduct.product.images = this.previewImgFile;
    storeProduct.product.originalPrice = {
      amount:  productForm.originalPrice,
      currency: this.storeCurrency
    };
    storeProduct.product.salePrice = {
      amount: productForm.salePrice,
      currency: this.storeCurrency
    };

    storeProduct.product.isDraft = true;

    let tagArr = [];
    for(let value of this.tags) {
      tagArr.push(value.name);
    }
    storeProduct.product.tags = tagArr.join(',');

    let self = this;
    self.shopService.changeProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings'], { replaceUrl: true });
    });
  }
}
