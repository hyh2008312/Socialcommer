import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShopService } from '../shop.service';

import { ImageUploadPreviewService } from "../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../shared/services/s3-upload/s3-upload.service";

@Component({
  selector: 'app-blog-create-dialog',
  templateUrl: './blog-create-dialog.component.html',
  styleUrls: ['../../store/store.scss','../shop.scss']
})

export class BlogCreateDialogComponent implements OnInit {

  blogForm : FormGroup;
  previewImgFile: any = '';
  previewImgSrc: any = '';

  // Editor
  public editor;
  public editorImageId = 'quillImage';

  ngOnInit() {
    let self = this;

  }

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService
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

  close():void {
    this.router.navigate(['/shop/blog']);
  }

  create() {
    if(!this.blogForm.valid) {
      return;
    }
    let self = this;
    let blogForm = this.blogForm.value;

    blogForm.modified = 'published';

    this.shopService.createBlog(blogForm).then((data) => {
      self.router.navigate(['/shop/blog'], { queryParams: {tab: 'published'}, replaceUrl: true});
    });
  }

  createDraft() {
    let self = this;
    let blogForm = this.blogForm.value;

    blogForm.modified = 'edit';

    this.shopService.createBlog(blogForm).then((data) => {
      self.router.navigate(['/shop/blog'], { queryParams: {tab: 'draft'}, replaceUrl: true});
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
          type: 'COLLECTOR_BLOG_DETAILS',
          fileName: file.name,
          use: 'detail',
          width: width,
          height: height
        }).then((data)=> {
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
