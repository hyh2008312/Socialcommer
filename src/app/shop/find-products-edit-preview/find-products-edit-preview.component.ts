import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';
import { ImageUploadPreviewService } from "../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../shared/services/s3-upload/s3-upload.service";

import { StoreProduct } from '../shop';

@Component({
  selector: 'app-find-products-edit-preview',
  templateUrl: './find-products-edit-preview.component.html',
  styleUrls: ['../../store/store.scss', '../shop.scss']
})

export class FindProductsEditPreviewComponent implements OnInit {

  productForm : FormGroup;

  public previewImg = [];

  // Enter, comma
  separatorKeysCodes = [ENTER, 188];
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  tags = [];

  public editor;
  public editorContent = '';
  public editorImageId = 'quillImage';

  product = {
    title: '',
    tags: '',
    salePriceAmount: 0,
    salePriceCurrency: 'USD',
    originalPriceAmount: 0,
    originalPriceCurrency: 'USD'
  };

  // Reset product
  productCopy: any;
  storeId: number;
  category: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private fb: FormBuilder,
    private userService: UserService,
    private previewImageService: ImageUploadPreviewService,
    private s3UploaderService: S3UploaderService
  ) {
    this.productForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      purchaseUrl: ['', [
        Validators.required
      ]],
      recommendation: [''],
      description: [''],
    });
  }

  ngOnInit():void {
    let id = this.activatedRoute.snapshot.params['id'];
    let self = this;
    self.shopService.getRecommendProduct({id}).then((data) => {

      self.productForm.setValue({
        title: data.title,
        purchaseUrl: '',
        recommendation: '',
        description: data.description
      });

      self.editorContent = data.description;

      self.product.title = data.title;
      self.product.tags = data.categoryName;
      self.product.salePriceAmount = data.salePriceAmount;
      self.product.originalPriceAmount = data.originalPriceAmount;
      self.product.salePriceCurrency = data.salePriceCurrency;
      self.product.originalPriceCurrency = data.originalPriceCurrency;

      self.tags.push({
        id: data.categoryId,
        name: data.categoryName
      });

      if(data.imageUrl.length > 0) {
        for(let value of data.imageUrl) {
          self.previewImg.push(value);
        }
      }

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
    'purchaseUrl': '',
    'recommendation': ''
  };
  //错误对应的提示
  validationMessages = {
    'title': {
      'required': 'This field is required.'
    },
    'purchaseUrl': {
      'required': 'This field is required.'
    },
    'recommendation':{
      'maxlength' : 'Recommendation contain 1000 characters at most.'
    }
  };

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
    this.router.navigate(['/shop/products']);
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
    let tagArr = [];
    for(let value of this.tags) {
      tagArr.push(value.name);
    }
    this.product.tags = tagArr.join(',');
  }

  resetCategory() {
    this.tags = [];
    this.tags.push({
      id: this.productCopy.categoryId,
      name: this.productCopy.categoryName
    });
  }

  showDescription() {
    this.showDescriptionEditor = !this.showDescriptionEditor;
  }

  resetDescription() {
    this.editorContent = this.productCopy.description;
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
          that.s3UploaderService.uploadToS3(file, data).then((data) => {
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
    for(let value of this.productCopy.imageUrl) {
      images.push(value.id);
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
      categoryId : this.tags[0]? this.tags[0].id : null
    };

    let self = this;
    this.shopService.createProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings'], { queryParams: {tab: 'published'}, replaceUrl: true});
    });
  }

  createDraft() {
    let productForm = this.productForm.value;

    let images = [];
    for(let value of this.productCopy.imageUrl) {
      images.push(value.id);
    }

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
      categoryId : this.tags[0]? this.tags[0].id : null
    };

    let self = this;
    this.shopService.createProduct(storeProduct).then((data) => {
      self.router.navigate(['/shop/listings'], { queryParams: {tab: 'draft'}, replaceUrl: true});
    });
  }

}
