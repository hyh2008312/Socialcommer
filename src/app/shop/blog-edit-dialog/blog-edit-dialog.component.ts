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
  selector: 'app-blog-edit-dialog',
  templateUrl: './blog-edit-dialog.component.html',
  styleUrls: ['../../store/store.scss','../shop.scss']
})

export class BlogEditDialogComponent implements OnInit {

  blogForm : FormGroup;
  previewImgFile: any;
  previewImgSrc: any;

  tab: string = '';

  // Editor
  public editor;
  public editorImageId = 'quillImage';


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

    this.blogForm = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      context: ['Write down your moment']
    });

    this.blogForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //存储错误信息
  formErrors = {
    'title': ''
  };
  //错误对应的提示
  validationMessages = {
    'title': {
      'required': 'This field is required.'
    }
  };

  ngOnInit() {
    let self = this;
    let id = self.activatedRoute.snapshot.params['id'];
    self.shopService.getBlogDetail(id).then((data) => {

      self.blogForm.setValue({
        title: data.title,
        context: data.context
      });

      self.previewImgFile = data.cover;
      self.previewImgSrc = data.cover;

    });

    self.activatedRoute.queryParams.subscribe((data) => {
      self.tab = data.tab;
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
      const control = this.blogForm.get(field);
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

  close():void {
    this.router.navigate(['/shop/blog']);
  }

  create() {
    if(!this.blogForm.valid) {
      return;
    }
    let id = this.activatedRoute.snapshot.params['id'];
    let blogForm = this.blogForm.value;

    blogForm.id = id;
    blogForm.cover = this.previewImgFile;
    blogForm.status = 'published';

    let self = this;
    this.shopService.changeBlog(blogForm).then((data) => {
      self.router.navigate(['/shop/blog'], { queryParams: {tab: 'published'}});
    });
  }

  createDraft() {
    let id = this.activatedRoute.snapshot.params['id'];
    let blogForm = this.blogForm.value;

    blogForm.id = id;
    blogForm.cover = this.previewImgFile;
    blogForm.status = 'editing';

    let self = this;
    self.shopService.changeBlog(blogForm).then((data) => {
      self.router.navigate(['/shop/blog'], { queryParams: {tab: 'draft'}});
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

}
