import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ShopService } from '../shop.service';
import { Product, StoreProduct } from '../shop';
import { UserService } from  '../../shared/services/user/user.service';

import { ImageUploadPreviewService } from "../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../shared/services/s3-upload/s3-upload.service";

import { ProductAffiliateLinkDialogComponent } from "../product-affiliate-link-dialog/product-affiliate-link-dialog.component";

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
  productId: number;
  isUser: boolean = false;

  product = {
    originalPrice: {
      amount: 0,
      currency: 'USD'
    },
    salePrice: {
      amount: 0,
      currency: 'USD'
    }
  };

  tab: string = '';

  // Editor
  public editor;
  public editorImageId = 'quillImage';

  // Enter, comma
  separatorKeysCodes = [ENTER, 188];
  tags: any[] = [];

  storeId: number;
  storeCurrency: string = 'USD';
  category: any;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public shopService: ShopService,
    public userService: UserService,
    private activatedRoute : ActivatedRoute,
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService,
    private dialog: MatDialog
  ) {

    this.productForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      salePrice: ['', [
        Validators.required
      ]],
      originalPrice: [''],
      purchaseUrl: ['', [
        Validators.required
      ]],
      recommendation: ['', [
        Validators.maxLength(1000)
      ]],
      description: ['']
    });

    this.productForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //存储错误信息
  formErrors = {
    'title': '',
    'salePrice':'',
    'purchaseUrl': '',
    'recommendation': ''
  };
  //错误对应的提示
  validationMessages = {
    'title': {
      'required': 'This field is required.'
    },
    'salePrice':{
      'required': 'This field is required.'
    },
    'purchaseUrl': {
      'required': 'This field is required.'
    },
    'recommendation':{
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

            self.tags.push({
              id: data.categoryId,
              name: data.categoryName
            });
            self.productForm.setValue({
              title: data.title,
              salePrice: data.salePriceAmount,
              originalPrice: data.originalPriceAmount,
              purchaseUrl: data.purchaseUrl,
              recommendation: data.recommendation,
              description: data.description
            });

            for(let value of data.imageUrl) {
              self.previewImgFile.push(value);
              self.previewImgSrcs.push(value);
            }

            self.relationId = data.id;

            self.productId = data.productId;

            self.isUser = data.isUser;

            self.product.originalPrice.amount = data.originalPriceAmount;
            self.product.originalPrice.currency = data.originalPriceCurrency;
            self.product.salePrice.amount = data.salePriceAmount;
            self.product.salePrice.currency = data.salePriceCurrency;
          });

        }
      }
    });

    self.activatedRoute.queryParams.subscribe((data) => {
      self.tab = data.tab;
    });

    self.userService.userCategory.subscribe((data) => {
      if(data) {
        self.category = data;
      }
    });
  }

  onEditorCreated(quill) {
    this.editor = quill;
    // console.log('quill is ready! this is current quill instance object', quill);
    let self = this;
    this.editor.getModule('toolbar').addHandler("image", (image) => {
      if(image) {
        var fileInput = document.getElementById(self.editorImageId);
        fileInput.click();
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
    let _value = event.value;
    let self = this;

    // Add our person
    if ((_value || '').trim()) {
      let isRepeat = false;

      for(let value of self.category) {
        if(value.name == _value) {
          isRepeat = true;
          this.tags.push({ id:value.id, name: _value.trim() });
          break;
        }
      }

      if(!isRepeat) {
        self.shopService.createCategory({
          categoryName: _value
        }).then((data) => {
          if(data) {
            self.category.unshift(data);
            self.userService.addUserCategory(self.category);
            self.tags.push({ id:data.id, name: _value.trim() });
          }
        });
      }
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
    this.router.navigate(['/shop/listings/products']);
  }

  create() {
    if(!this.productForm.valid) {
      return;
    }

    let productForm = this.productForm.value;

    let storeProduct = new StoreProduct();
    storeProduct.id = this.relationId;
    storeProduct.purchaseUrl = productForm.purchaseUrl;
    storeProduct.storeId = this.storeId;
    storeProduct.isCustomer = true;
    storeProduct.recommendation = productForm.recommendation;
    storeProduct.isDraft = false;
    storeProduct.status = 'on';

    let product = new Product();

    storeProduct.product = product;
    storeProduct.description = productForm.description;
    storeProduct.title = productForm.title;
    storeProduct.cover = [];
    storeProduct.cover = [...this.previewImgFile];
    if(storeProduct.cover.length <= 0) {
      return;
    }

    if(this.isUser) {
      storeProduct.product.originalPrice = {
        amount: productForm.originalPrice != '' ? productForm.originalPrice : 0,
        currency: this.storeCurrency
      };
      storeProduct.product.salePrice = {
        amount: productForm.salePrice,
        currency: this.storeCurrency
      };
    } else {
      storeProduct.product.originalPrice = {
        amount: product.originalPrice.amount,
        currency: product.originalPrice.currency
      };
      storeProduct.product.salePrice = {
        amount: product.salePrice.amount,
        currency: product.salePrice.currency
      };
    }


    if(this.tags[0]) {
      storeProduct.categoryName = this.tags[0].name;
    }

    let self = this;
    this.shopService.changeProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings/products'], { queryParams: {tab: 'published'}, replaceUrl: true});
    });
  }

  createDraft() {
    let productForm = this.productForm.value;

    let storeProduct = new StoreProduct();
    storeProduct.id = this.relationId;
    storeProduct.purchaseUrl = productForm.purchaseUrl;
    storeProduct.storeId = this.storeId;
    storeProduct.isCustomer = true;
    storeProduct.recommendation = productForm.recommendation;
    storeProduct.isDraft = true;

    let product = new Product();

    storeProduct.product = product;
    storeProduct.description =  productForm.description;
    storeProduct.title = productForm.title;
    storeProduct.cover = [];
    storeProduct.cover = [...this.previewImgFile];

    if(this.isUser) {
      storeProduct.product.originalPrice = {
        amount: productForm.originalPrice != '' ? productForm.originalPrice : 0,
        currency: this.storeCurrency
      };
      storeProduct.product.salePrice = {
        amount: productForm.salePrice,
        currency: this.storeCurrency
      };
    } else {
      storeProduct.product.originalPrice = {
        amount: product.originalPrice.amount,
        currency: product.originalPrice.currency
      };
      storeProduct.product.salePrice = {
        amount: product.salePrice.amount,
        currency: product.salePrice.currency
      };
    }
    storeProduct.isDraft = true;
    storeProduct.categoryName = '';
    if(this.tags[0]) {
      storeProduct.categoryName = this.tags[0].name;
    }

    let self = this;
    self.shopService.changeProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings/products'], { queryParams: {tab: 'draft'}, replaceUrl: true});
    });
  }

  save() {
    if(!this.productForm.valid) {
      return;
    }

    let productForm = this.productForm.value;

    let storeProduct = new StoreProduct();
    storeProduct.id = this.relationId;
    storeProduct.productId = this.productId;
    storeProduct.purchaseUrl = productForm.purchaseUrl;
    storeProduct.storeId = this.storeId;
    storeProduct.isCustomer = false;
    storeProduct.recommendation = productForm.recommendation;
    storeProduct.isDraft = false;

    let product = new Product();

    storeProduct.product = product;
    storeProduct.description = productForm.description;
    storeProduct.title = productForm.title;
    storeProduct.cover = [];
    storeProduct.cover = [...this.previewImgFile];

    if(storeProduct.cover.length <= 0) {
      return;
    }

    if(this.isUser) {
      storeProduct.product.originalPrice = {
        amount: productForm.originalPrice != '' ? productForm.originalPrice : 0,
        currency: this.storeCurrency
      };
      storeProduct.product.salePrice = {
        amount: productForm.salePrice,
        currency: this.storeCurrency
      };
    } else {
      storeProduct.product.originalPrice = {
        amount: product.originalPrice.amount,
        currency: product.originalPrice.currency
      };
      storeProduct.product.salePrice = {
        amount: product.salePrice.amount,
        currency: product.salePrice.currency
      };
    }

    storeProduct.isDraft = false;
    if(this.tags[0]) {
      storeProduct.categoryName = this.tags[0].name;
    } else {
      storeProduct.categoryName = '';
    }

    let self = this;
    self.shopService.changeProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings/products'], { queryParams: {tab: 'unpublished'}, replaceUrl: true});
    });
  }

  addPicture(event) {
    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImageService.readAsDataUrl(event.target.files[0]).then(function(result) {

      let file = event.target.files[0];

      let image = new Image();
      image.onload = function(){
        let width = image.width;
        let height = image.height;

        that.s3UploaderService.upload({
          type: 'COLLECTOR_PRODUCT_DETAILS',
          fileName: file.name,
          use: 'detail',
          width: width,
          height: height
        }).then((data)=> {
          let id = data.id;
          let imageUrl = `${data.url}/${data.key}`;
          that.s3UploaderService.uploadToS3WithoutLoading(file, data).then((data) => {
            let range = that.editor.getSelection();
            that.editor.insertEmbed(range.index, 'image', imageUrl);
          });
        });
      };
      image.src = window.URL.createObjectURL(file);

    })

  }

  openDialog() {
    let dialogRef = this.dialog.open(ProductAffiliateLinkDialogComponent, {
      data: {
        source: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
