import {Component, HostListener, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar} from '@angular/material';

import { ShopService } from '../shop.service';
import { UserService } from  '../../../shared/services/user/user.service';
import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

import { ProductShareDialogComponent } from "../product-share-dialog/product-share-dialog.component";

@Component({
  selector: 'app-shop-find-products-share',
  templateUrl: './find-products-share.component.html',
  styleUrls: ['../_shop.scss']
})

export class FindProductsShareComponent implements OnInit {

  productForm : FormGroup;

  formErr: any = false;

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
    source: '',
    supplierId: 0
  };

  // Reset product
  productCopy: any;
  storeId: number;
  displayName: string = '';
  templateId: any = 5;

  isSupplierEdit = false;

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
      recommendation: [''],
      description: ['', Validators.required]
    });

    this.productForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit():void {
    let id = this.activatedRoute.snapshot.params['id'];
    if(this.activatedRoute.parent.snapshot.params['supplierId']) {
      this.isSupplierEdit = true;
    }
    let self = this;
    self.shopService.getSupplyProductDetail({id}).then((data) => {

      self.productForm.patchValue({
        title: data.title,
        tags: '',
        recommendation: '',
        description: data.description
      });

      self.editorContent = data.description;

      self.product.title = data.title;
      self.product.categoryName = data.categories[0].name;
      self.product.salePriceAmount = data.saleUnitPrice;
      self.product.originalPriceAmount = data.unitPrice;
      self.product.supplierId = data.supplierId;

      self.previewImg.push(data.mainImage);

      self.productCopy = data;

    });

    self.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;
        self.displayName = data.displayName;
        self.templateId = data.template? data.template.templateId:5;
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
    if(!this.isSupplierEdit) {
      this.router.navigate(['/shop/listings/items/']);
    } else {
      this.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/`]);
    }
  }

  showCategoryInput: boolean = false;


  create(source?:any) {
    if(!this.productForm.valid) {
      this.formErr = 'Please select a category first. ';
      return;
    }

    let productForm = this.productForm.value;

    if(productForm.categoryName.trim() == '') {
      return;
    }

    let storeProduct = {
      productId: this.productCopy.id,
      recommendation : productForm.recommendation,
      categoryName : productForm.categoryName
    };

    let self = this;
    self.shopService.createSupplyProduct(storeProduct).then((data) => {
      self.formErr = false;
      let link = `http://${window.location.host}/store/${this.displayName}/${this.templateId}/detail/${data.id}`;
      let text = data.title;
      self.getSharer(source, {
        link,
        text
      });
      if(!self.isSupplierEdit) {
        self.router.navigate(['/shop/listings/items/'],{ replaceUrl: true, skipLocationChange: false  });
      } else {
        self.router.navigate([`/shop/listings/items/supplier/${this.product.supplierId}/`], { replaceUrl: true, skipLocationChange: false });
      }
    }).catch((data) => {
      self.formErr = data;
    });
  }

  private sharers = {
    facebook: {
      shareUrl: 'https://www.facebook.com/sharer/sharer.php'
    },
    twitter: {
      shareUrl: 'https://twitter.com/intent/tweet/'
    },
    whatsapp: {
      shareUrl: 'https://api.whatsapp.com/send'
    }
  };

  shareWidth: string;
  shareHeight: string;

  private urlSharer(sharer: any) {
    let p = sharer.params || {},
      keys = Object.keys(p),
      i: any,
      str = keys.length > 0 ? '?' : '';
    for (i = 0; i < keys.length; i++) {
      if (str !== '?') {
        str += '&';
      }
      if (p[keys[i]]) {
        str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
      }
    }

    let url = sharer.shareUrl + str;

    if (!sharer.isLink) {
      let popWidth = sharer.width || 600,
        popHeight = sharer.height || 480,
        left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
        top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
        popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
        newWindow = window.open(url, '', popParams);

      if (window.focus) {
        newWindow.focus();
      }
    } else {
      window.location.href = url;
    }
  }


  private getSharer(share:any, data:any){
    if(!share) {
      return;
    }

    if(share == 'youtube') {
      this.shareToYoutube(data);
      return;
    }

    let _sharer: any = {};
    if(share == 'facebook'){
      _sharer= this.sharers['facebook'];
      _sharer.params = {
        u: data.link
      }
    }

    if(share == 'twitter'){
      _sharer = this.sharers['twitter'];
      _sharer.params = {
        url: data.link,
        text: 'Don’t miss out on this new product in my store: ' + data.text,
        hashtags: ''
      };
    }

    if(share == 'whatsApp') {
      _sharer = this.sharers['whatsapp'];
      _sharer.params = {
        text: 'Don’t miss out on this new product in my store: ' + data.text + '. Product link:' + data.link
      };
    }

    _sharer.width = this.shareWidth;
    _sharer.height = this.shareHeight;
    this.urlSharer(_sharer);

  }

  shareToYoutube(data) {
    let dialogRef = this.dialog.open(ProductShareDialogComponent, {
      data: {
        shareLink: data.link,
        text: data.text
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



}
