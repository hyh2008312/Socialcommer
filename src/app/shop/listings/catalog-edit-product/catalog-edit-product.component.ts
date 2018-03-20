import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { ShopService } from '../shop.service';
import { Product, StoreProduct } from '../shop';
import { UserService } from  '../../../shared/services/user/user.service';

import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

import { SnackItemBarSuccessComponent } from '../snack-item-bar-success/snack-item-bar-success.component';

@Component({
  selector: 'app-catalog-edit-product',
  templateUrl: './catalog-edit-product.component.html',
  styleUrls: ['../_shop.scss']
})

export class CatalogEditProductComponent implements OnInit {

  productForm : FormGroup;
  previewImgFile: any[] = [];
  previewImgSrcs: any[] = [];
  relationId: number;
  productId: number;
  title: string = '';
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

  tags: any = '';
  isCreateCategory: boolean = false;

  storeId: number;
  storeCurrency: string = 'USD';
  category: any;

  hasPicture: boolean = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public shopService: ShopService,
    public userService: UserService,
    private activatedRoute : ActivatedRoute,
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

    this.productForm = this.fb.group({
      categoryName: ['', [
        Validators.required
      ]],
      tags: [''],
      recommendation: ['', [
        Validators.maxLength(1000)
      ]]
    });

    this.productForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //存储错误信息
  formErrors = {
    'categoryName': '',
    'recommendation': ''
  };
  //错误对应的提示
  validationMessages = {
    'categoryName': {
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

            self.productForm.setValue({
              categoryName: data.categoryName,
              tags: '',
              recommendation: data.recommendation
            });

            self.title = data.title;

            self.productId = data.id;

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
    this.router.navigate(['/shop/listings/products']);
  }

  create() {
    if(!this.productForm.valid) {
      return;
    }

    this.hasPicture = false;

    let productForm = this.productForm.value;

    let storeProduct = productForm;

    storeProduct.id = this.productId;

    storeProduct.status = 'published';

    storeProduct.categoryName = productForm.categoryName;
    if(storeProduct.categoryName.trim() == '') {
      return;
    }

    let self = this;
    this.shopService.changeProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings/products'], { queryParams: {tab: 'published'}, replaceUrl: true}).then(() => {
        self.openSnackBar();
      });
    });
  }

  createDraft() {
    let productForm = this.productForm.value;

    let storeProduct = productForm;

    storeProduct.id = this.productId;

    storeProduct.status = 'draft';

    let self = this;
    self.shopService.changeProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings/products'], { queryParams: {tab: 'draft'}, replaceUrl: true}).then(() => {
        self.openSnackBar();
      });
    });
  }

  save() {
    if(!this.productForm.valid) {
      return;
    }
    let productForm = this.productForm.value;

    let storeProduct = productForm;

    storeProduct.id = this.productId;

    if(storeProduct.categoryName.trim() == '') {
      return;
    }

    let self = this;
    self.shopService.changeProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings/products'], { queryParams: {tab: 'unpublished'}, replaceUrl: true}).then(() => {
        self.openSnackBar();
      });
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

  openSnackBar() {
    this.snackBar.openFromComponent(SnackItemBarSuccessComponent, {
      duration: 1500,
      verticalPosition: 'top'
    });
  }
}