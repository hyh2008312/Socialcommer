import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';
import { ImageUploadPreviewService } from "../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../shared/services/s3-upload/s3-upload.service";

import { StoreProduct } from '../shop';

import { ProductAffiliateLinkDialogComponent } from "../product-affiliate-link-dialog/product-affiliate-link-dialog.component";

@Component({
  selector: 'app-find-products-edit-preview',
  templateUrl: './find-products-edit-preview.component.html',
  styleUrls: ['../../store/store.scss', '../shop.scss']
})

export class FindProductsEditPreviewComponent implements OnInit {

  productForm : FormGroup;

  public previewImg = [];

  tags: any = '';
  isCreateCategory: boolean = false;

  category: any = [];

  public editor;
  public editorContent = 'Please add product details and images';
  public editorImageId = 'quillImage';

  product = {
    title: '',
    categoryName: '',
    salePriceAmount: 0,
    salePriceCurrency: 'USD',
    originalPriceAmount: 0,
    originalPriceCurrency: 'USD',
    source: ''
  };

  // Reset product
  productCopy: any;
  storeId: number;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private fb: FormBuilder,
    private userService: UserService,
    private previewImageService: ImageUploadPreviewService,
    private s3UploaderService: S3UploaderService,
    private dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      tags: [''],
      categoryName: ['', [
        Validators.required
      ]],
      purchaseUrl: ['', [
        Validators.required
      ]],
      recommendation: [''],
      description: ['', Validators.required]
    });

    this.productForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit():void {
    let id = this.activatedRoute.snapshot.params['id'];
    let self = this;
    self.shopService.getRecommendProduct({id}).then((data) => {

      self.productForm.setValue({
        title: data.title,
        tags: '',
        categoryName: data.category,
        purchaseUrl: '',
        recommendation: '',
        description: data.description
      });

      let feature = '';
      if(data.features) {
        for(let value of data.features) {
          feature += `<p>${value}</p><br>`;
        }
        self.editorContent = `<div>${feature}</div>`;
      }

      self.product.title = data.title;
      self.product.categoryName = data.category;
      self.product.salePriceAmount = data.salePrice.amount;
      self.product.originalPriceAmount = data.originalPrice.amount;
      self.product.salePriceCurrency = data.salePrice.currency;
      self.product.originalPriceCurrency = data.originalPrice.currency;

      self.product.source = data.source;

      self.previewImg.push(data.cover);

      self.productCopy = data;
    });

    self.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;
      }
    });

    self.userService.userCategory.subscribe((data) => {
      if(data) {
        self.category = data;
      }
    });
  }

  //存储错误信息
  formErrors = {
    'title': '',
    'category': '',
    'purchaseUrl': '',
    'recommendation': '',
    'description' : ''
  };
  //错误对应的提示
  validationMessages = {
    'title': {
      'required': 'This field is required.'
    },
    'category': {
      'required': 'This field is required.'
    },
    'purchaseUrl': {
      'required': 'This field is required.'
    },
    'description': {
      'required': 'This field is required.'
    },
    'recommendation':{
      'maxlength' : 'Recommendation contain 1000 characters at most.'
    }
  };

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data?:any) {

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

  onEditorCreated(quill) {
    this.editor = quill;

    let self = this;
    this.editor.getModule('toolbar').addHandler("image", (image) => {
      if(image) {
        var fileInput = document.getElementById(self.editorImageId);
        fileInput.click();
      }
    });
  }

  showCreate() {
    this.isCreateCategory = true;
  }

  add(value: any): void {
    let self = this;

    // Add our person
    if ((value || '').trim()) {
      let isRepeat = false;

      for(let item of self.category) {
        if(item.name == value) {
          isRepeat = true;
          this.productForm.patchValue({
            categoryName:  value.trim()
          });
          this.isCreateCategory = false;
          break;
        }
      }

      if(!isRepeat) {
        self.shopService.createCategory({
          categoryName: value
        }).then((data) => {
          if(data) {
            self.productForm.patchValue({
              categoryName:  data.name
            });
            self.isCreateCategory = false;
            self.category.unshift(data);
            self.userService.addUserCategory(self.category);
          }
        });
      }
    }

  }


  close():void {
    this.router.navigate(['/shop/listings/items']);
  }

  showTitleInput: boolean = false;
  showCategoryInput: boolean = false;
  showDescriptionEditor: boolean = false;

  showTitle() {
    this.showTitleInput = !this.showTitleInput;
  }

  resetTitle() {
    this.product.title = this.productCopy.title;
  }

  showCategory() {
    this.showCategoryInput = !this.showCategoryInput;
  }

  resetCategory() {
    this.tags = [];
    this.tags.push({
      id: null,
      name: this.productCopy.category
    });
  }

  showDescription() {
    this.showDescriptionEditor = !this.showDescriptionEditor;
  }

  resetDescription() {
    let feature = '';
    if(this.productCopy.features) {
      for(let value of this.productCopy.features) {
        feature += `<p>${value}</p><br>`;
      }
      this.editorContent = `<div>${feature}</div>`;
    } else {
      this.editorContent = '';
    }
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

  create() {
    if(!this.productForm.valid) {
      return;
    }

    let productForm = this.productForm.value;
    let images = [];
    images.push(this.productCopy.cover);

    if(productForm.categoryName.trim() == '') {
      return;
    }

    let storeProduct = {
      productId: this.productCopy.id,
      purchaseUrl : productForm.purchaseUrl,
      storeId : this.storeId,
      isCustomer : true,
      recommendation : productForm.recommendation,
      isDraft : false,
      status : 'on',
      isUser : true,
      description : this.editorContent,
      title : productForm.title,
      cover : [...images],
      categoryName : productForm.categoryName,
      product: {
        originalPrice : {
          amount: this.product.originalPriceAmount,
          currency: this.product.originalPriceCurrency
        },
        salePrice : {
          amount: this.product.salePriceAmount,
          currency: this.product.salePriceCurrency
        }
      }
    };

    let self = this;
    this.shopService.createProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings/products'], { queryParams: {tab: 'published'}, replaceUrl: true});
    });
  }

  createDraft() {
    let productForm = this.productForm.value;

    let images = [];
    images.push(this.productCopy.cover);

    let storeProduct = {
      productId: this.productCopy.id,
      purchaseUrl : productForm.purchaseUrl,
      storeId : this.storeId,
      isCustomer : true,
      recommendation : productForm.recommendation,
      isDraft : true,
      status : 'off',
      isUser : true,
      description : this.editorContent,
      title : productForm.title,
      cover : [...images],
      categoryName : productForm.categoryName,
      product: {
        originalPrice : {
          amount: this.product.originalPriceAmount,
          currency: this.product.originalPriceCurrency
        },
        salePrice : {
          amount: this.product.salePriceAmount,
          currency: this.product.salePriceCurrency
        }
      }
    };

    let self = this;
    this.shopService.createProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings/products'], { queryParams: {tab: 'draft'}, replaceUrl: true});
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(ProductAffiliateLinkDialogComponent, {
      data: {
        source: this.product.source
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
