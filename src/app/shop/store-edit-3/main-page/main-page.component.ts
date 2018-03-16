import {Component, OnInit, OnDestroy, AfterViewChecked} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {StoreService} from '../../store.service';
import {ShopService} from '../../shop.service';
import {UserService} from '../../../shared/services/user/user.service';

import {UserProfile, Store} from '../../shop';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {StoreShareDialogComponent} from "../../store-share-dialog/store-share-dialog.component";

@Component({
  selector: 'app-shop-template-3',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class MainPageComponent implements OnInit {
  viewIndex: number = 0;
  storeName: string = '';
  isDialogOpen: boolean = false;

  public categories: any = [];
  public category: any = {
    id: null,
    name: 'All'
  };
  public shareLink: string;
  public text = '';

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  nextBlogPage: boolean = true;
  product: any = [];

  blog: any = [];

  ownerId: any;

  public editorConfig = {
    theme: 'bubble',
    modules: {
      toolbar: [
        ['bold', 'italic'],
        [{'align': []}],
        [{'color': []}],
        [{'font': []}],
        [{'size': ['small', false, 'large', 'huge']}],
        ['link'],
        ['clean']
      ]
    }
  };
  editorContent = '';
  userProfile: UserProfile = new UserProfile();
  userCountry: string = '';

  storeTemplateForm: FormGroup;
  storeForm: FormGroup;

  templateId: any = false;
  templateList: any = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private fb: FormBuilder,
              private userService: UserService,
              private shopService: ShopService,
              private dialog: MatDialog) {
    let self = this;
    self.storeTemplateForm = self.fb.group({
      nameTag: [self.nameTag],
      titleTag: [self.titleTag],
      descriptionTag: [self.descriptionTag],
      userTag: [self.userTag],
      name: [],
      country: []
    });

    self.storeForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      displayName: ['', [
        Validators.required
      ]]
    });

    this.storeForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  ngOnInit(): void {
    this.shareLink = window.location.host + '/store/';
    let self = this;
    let firstLoad = false;
    self.shopService.templateList.subscribe((data) => {
      if (data) {
        self.templateList = data;
        self.userService.store.subscribe((data) => {
          if (data) {
            self.store = data;
            self.text = data.description;
            if (!firstLoad) {
              firstLoad = true;

              self.storeForm.setValue({
                name: self.store.name,
                description: self.store.description,
                displayName: self.store.displayName
              });

              self.shopService.getFrontStore(self.store.displayName).then((data) => {
                self.ownerId = data.ownerId;
                if (data.category.length > 1) {
                  self.categories = [{name: 'All'}, ...data.category];
                } else {
                  self.categories = [...data.category];
                }
                self.category = self.categories[0];
                self.queryProduct();
                self.queryBlog();
              });

              for (let value of self.templateList) {
                if (value.templateId == 3) {
                  self.templateId = value.id;
                  self.nameTag = value.context.nameTag != '' ? value.context.nameTag : self.nameTag;
                  self.storeName = value.context.nameTag != '' ? value.context.nameTag : data.name;
                  self.titleTag = value.context.titleTag != '' ? value.context.titleTag : self.titleTag;
                  self.descriptionTag = value.context.descriptionTag != '' ? value.context.descriptionTag : self.descriptionTag;
                  self.userTag = value.context.userTag != '' ? value.context.userTag : self.userTag;
                  if (value.context.blogFlag) {
                    self.blogFlag = value.context.blogFlag;
                  } else {
                    self.blogFlag = 1;
                  }
                  // 对于显示和隐藏进行设定
                  if (self.blogFlag == 1 || self.blogFlag == 2) {
                    self.isShowBlog = true;
                  } else {
                    self.isShowBlog = false;
                  }
                  self.imageSrc = value.images.imageSrc;
                  self.aboutMeSrc = value.images.aboutMeSrc;
                  break;
                }
              }

            }
          }
        })
      }
    })
  }


  //存储错误信息
  formErrors = {
    'name': '',
    'displayName': '',
    'description': ''
  };
  //错误对应的提示
  validationMessages = {
    'name': {
      'required': 'This field is required.'
    },
    'displayName': {
      'required': 'This field is required.'
    },
    'description': {
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
      const control = this.storeForm.get(field);
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

  };

  nameTag = 'STORE NAME';
  titleTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">Click here to edit the title</strong></p>';
  descriptionTag = '<p class="ql-align-center"><strong style="color: rgb(255, 255, 255);">This was founded with starter site, a single page ' +
    'online storefront. All of the images and text on this page can be changed to personalize the site for brand ' +
    'and to communicate your unique story to your customers.</strong></p>';
  userTag = '<p>Here you let your customers get to know you. Tell them a little bit about yourself and why you create this ' +
    'business. Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills' +
    ' or training that make you an expert in your field? Show your customers that there are real people with interesting ' +
    'stories working behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust ' +
    'in your brand.</p>';
  imageSrc = 'https://media.socialcommer.com/source/web/template/3/15-pic.jpg';
  aboutMeSrc = 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg';

  uploadAboutType = 'COLLECTOR_STORE_TEMPLATE';

  nameEdited: boolean = false;
  titleEdited: boolean = false;
  descriptionEdited: boolean = false;
  userEdited: boolean = false;
  userNameEdited: boolean = false;
  userCountryEdited: boolean = false;
  imageEdited: boolean = false;
  avatarEdited: boolean = false;
  storeEdited: boolean = false;

  editName() {
    this.nameEdited = !this.nameEdited;
  }

  editTitle() {
    this.titleEdited = !this.titleEdited;
  }

  editDescription() {
    this.descriptionEdited = !this.descriptionEdited;
  }

  editUser() {
    this.userEdited = !this.userEdited;
  }

  editUserName() {
    this.userNameEdited = !this.userNameEdited;
  }

  editUserCountry() {
    this.userCountryEdited = !this.userCountryEdited;
  }

  editImage() {
    this.imageEdited = !this.imageEdited;
  }

  editAvatar() {
    this.avatarEdited = !this.avatarEdited;
  }

  editStore() {
    this.storeEdited = !this.storeEdited;
  }

  close() {
    this.router.navigate(['/shop/store/settings']);
  }

  submitTemplate() {
    if (!this.storeForm.valid) {
      this.storeEdited = true;
      return;
    }
    if (!this.storeTemplateForm.valid) {
      return;
    }

    let self = this;

    if (!this.templateId) {
      let options = {
        templateId: 3,
        storeId: this.store.id,
        context: {
          nameTag: this.nameTag,
          titleTag: this.titleTag,
          descriptionTag: this.descriptionTag,
          userTag: this.userTag,
          blogFlag: this.blogFlag
        },
        images: {
          imageSrc: this.imageSrc,
          aboutMeSrc: this.aboutMeSrc
        }
      };
      this.shopService.createMultiTemplate(options).then((data) => {
        data.context = options.context;
        data.images = options.images;
        self.templateList.unshift(data);
        self.shopService.setTemplateUId(3);
        self.shopService.createTemplate({
          storeId: self.store.id,
          storeTemplateId: data.id
        }).then((data) => {
          self.shopService.setTemplateList(self.templateList);
        });
        self.openDialog(`${self.store.displayName}`);
        self.router.navigate(['/shop/dashboard']);
      });
    } else {
      let options = {
        id: this.templateId,
        context: {
          nameTag: this.nameTag,
          titleTag: this.titleTag,
          descriptionTag: this.descriptionTag,
          userTag: this.userTag,
          blogFlag: this.blogFlag
        },
        images: {
          imageSrc: this.imageSrc,
          aboutMeSrc: this.aboutMeSrc
        }
      };
      this.shopService.updateMultiTemplate(options).then((data) => {
        let index = self.templateList.findIndex((item) => {
          if (item.id == data.id) {
            return true;
          }
        });
        self.templateList.splice(index, 1);
        data.context = options.context;
        data.images = options.images;
        self.templateList.unshift(data);
        self.shopService.setTemplateUId(3);
        self.shopService.createTemplate({
          storeId: self.store.id,
          storeTemplateId: data.id
        }).then((data) => {
          self.shopService.setTemplateList(self.templateList);
        });
        self.openDialog(`${self.store.displayName}`);
        self.router.navigate(['/shop/dashboard']);
      });
    }
  }

  changeStore() {
    if (!this.storeForm.valid) {
      return;
    }

    let store = this.storeForm.value;
    store.id = this.store.id;
    store.statuts = this.store.status;
    store.currency = this.store.currency;
    let self = this;

    this.shopService.changeStore(store).then((data) => {
      self.storeEdited = false;
      self.userService.addStore(data);
      self.submitTemplate();
    });
  }

  changeCategory() {
    this.page = 1;
    this.queryProduct(true);
  }

  openDialog(displayName?: any): void {
    let dialogRef = this.dialog.open(StoreShareDialogComponent, {
      data: {
        shareLink: 'http://' + this.shareLink + displayName,
        text: this.store.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      this.nextPage = false;
      return;
    }
    let options = {
      cat: this.category.id,
      store: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 4
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      if (clearProduct) {
        self.product = [];
        self.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  queryBlog(clearBlog?: boolean) {
    if (!this.ownerId) {
      return;
    }
    let options = {
      ownerId: this.ownerId,
      page: this.page,
      page_size: 2
    };
    let self = this;
    self.storeService.getBlog(options).then((data) => {
      if (clearBlog) {
        self.blog = [];
        self.nextBlogPage = true;
      }
      self.blog = self.blog.concat(data.results);
      if (data.next == null) {
        self.nextBlogPage = false;
      }
    });
  }

  ngOnDestroy() {

  }

  openNavigationDialog(event?: any) {
    if (event) {
      this.changeViewPort(event);
      return this.isDialogOpen = false;
    }
    this.isDialogOpen = !this.isDialogOpen;
  }

  changeViewPort(index) {
    this.viewIndex = index;
  }

  jumpToCollection() {
    this.viewIndex = 1;
  }

  jumpToBlog() {
    this.viewIndex = 2;
  }

  // 跳转到商品详情页
  selectProductId: any;
  goodsDetail: boolean = false;

  jumpGoodsDetail(productId: any) {
    this.selectProductId = productId;
    this.changeGoodsDetail(4);
  }

  changeGoodsDetail(viewNum: number) {
    this.viewIndex = viewNum;
  }


  //设定一个变量，用来保存是否显示还是隐藏blog.
  // 1.表示未设定这个功能 2.表示显示（true） 3表示隐藏(false)
  blogFlag: number = 1;

  //是否需要显示blog(用户自己设定)
  isShowBlog: boolean = true;

  changeIsShowBlog(isShow: boolean) {
    this.isShowBlog = isShow;
    if (isShow) {
      this.blogFlag = 2;
    } else {
      this.blogFlag = 3;
    }
  }



}
