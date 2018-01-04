import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user/user.service';
import {ShopService} from '../../shop.service';
import {MatDialog} from '@angular/material';
import {Store} from '../../shop';
import {StoreShareDialogComponent} from '../../store-share-dialog/store-share-dialog.component';

@Component({
  selector: 'app-store-template-edit-2',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class MainPageComponent implements OnInit {

  shareLink: string;
  ratio: any;

  viewIndex: number;

  //定义字段
  nameTag = 'STORE NAME';
  titleTag = '<p class="ql-align-center"><strong class="ql-size-huge">Click here to edit the title</strong></p>';
  aboutMeTag = '<p>Here you let your customers get to know you. Tell them a little bit about ' +
    'yourself and why you create this business. Show your customers that there are real people with ' +
    'interesting stories working behind the scenes.</p>';

  productTitleTag = '<p class="ql-align-center"><strong class="ql-size-large">New Arrivals</strong></p>';

  productDesTag = '<p class="ql-align-center">Discover The Best Daily Offers for Moms & Kids.</p>';


  uploadAboutType = 'COLLECTOR_STORE_TEMPLATE';
  text = '';


  // 图片链接（第四套模版）
  aboutMeCover = 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg';
  imageBanner: string = 'https://media.socialcommer.com/source/web/template/4/12.jpg';

  imageAdOne: string = 'https://media.socialcommer.com/source/web/template/4/1.jpg';
  imageAdTwo: string = 'https://media.socialcommer.com/source/web/template/4/2.jpg';
  imageAdThree: string = 'https://media.socialcommer.com/source/web/template/4/3.jpg';


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
  storeTemplateForm: FormGroup;
  storeForm: FormGroup;

  templateId: any = false;
  templateList: any = [];
  store: Store = new Store();
  ownerId: any;

  //标记是否可以进行编辑
  nameEdited: boolean = false;
  titleEdited: boolean = false;
  productTitleEdit: boolean = false;
  productDesEdit: boolean = false;
  aboutMeEdited: boolean = false;

  imageEdited: boolean = false;
  imageHomeMadeEdited: boolean = false;
  storeEdited: boolean = false;

  editImage() {
    this.imageEdited = !this.imageEdited;
  }

  editName() {
    this.nameEdited = !this.nameEdited;
  }

  editTitle() {
    this.titleEdited = !this.titleEdited;
  }

  editProductTitle() {
    this.productTitleEdit = !this.productTitleEdit;
  }

  editProductDes() {
    this.productDesEdit = !this.productDesEdit;
  }

  editAboutMe() {
    this.aboutMeEdited = !this.aboutMeEdited;
  }


  editImageHomeMade() {
    this.imageHomeMadeEdited = !this.imageHomeMadeEdited;
  }

  editStore() {
    this.storeEdited = !this.storeEdited;
  }

  changeAboutMe($event) {
    this.aboutMeTag = $event;

  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private fb: FormBuilder,
              private userService: UserService,
              private shopService: ShopService,
              private dialog: MatDialog) {
    this.viewIndex = 0;
    this.ratio = 1920 / 270;
    let self = this;
    self.storeTemplateForm = self.fb.group({
      nameTag: [self.nameTag],
      titleTag: [self.titleTag],
      productTitleTag: [self.productTitleTag],
      productDesTag: [self.productDesTag],
      aboutMeTag: [self.aboutMeTag],
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

  storeName: string = '';
  isDialogOpen: boolean = false;


  adoneCategory: any = {
    id: null,
    name: ''
  };
  adTwoCategory: any = {
    id: null,
    name: ''
  };
  adThreeCategory: any = {
    id: null,
    name: ''
  };

  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };

  page = 1;
  nextPage: boolean = true;
  nextBlogPage: boolean = true;
  product: any = [];
  homeProduct: any = [];
  isFirstHomeProduct: boolean = true;

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
                // 分类广告
                if (data.category.length == 1) {
                  self.adoneCategory = data.category[0];
                } else if (data.category.length == 2) {
                  self.adoneCategory = data.category[0];
                  self.adTwoCategory = data.category[1];
                } else if (data.category.length == 3) {
                  self.adoneCategory = data.category[0];
                  self.adTwoCategory = data.category[1];
                  self.adThreeCategory = data.category[2];
                } else if (data.category.length > 3) {
                  self.adoneCategory = data.category[data.category.length - 3];
                  self.adTwoCategory = data.category[data.category.length - 2];
                  self.adThreeCategory = data.category[data.category.length - 1];
                }
                self.category = self.categories[0];
                self.queryProduct();
                self.queryBlog();
              });
              for (let value of self.templateList) {
                if (value.uid == 4) {
                  self.templateId = value.id;
                  self.nameTag = value.context.nameTag != '' ? value.context.nameTag : self.nameTag;
                  self.titleTag = value.context.titleTag != '' ? value.context.titleTag : self.titleTag;
                  self.productTitleTag = value.context.productTitleTag != '' ? value.context.productTitleTag : self.productTitleTag;
                  self.productDesTag = value.context.productDesTag != '' ? value.context.productDesTag : self.productDesTag;
                  self.aboutMeTag = value.context.aboutMeTag != '' ? value.context.aboutMeTag : self.aboutMeTag;

                  self.imageBanner = value.image.imageBanner;
                  self.imageAdOne = value.image.imageAdOne;
                  self.imageAdTwo = value.image.imageAdTwo;
                  self.imageAdThree = value.image.imageAdThree;
                  self.aboutMeCover = value.image.aboutMeCover;
                  break;
                }
              }

            }
          }
        })
      }
    })
  }

  changeCategory() {
    this.page = 1;
    this.queryProduct(true);
  }


  jumpCategory(index: number): void {
    this.viewIndex = 1;
    if (index == 0) {
      this.category = this.adoneCategory;
      this.changeCategory();
    } else if (index == 1) {
      this.category = this.adTwoCategory;
      this.changeCategory();
    } else if (index == 2) {
      this.category = this.adThreeCategory;
      this.changeCategory();
    }
  }

  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      return;
    }
    let options = {
      categoryId: this.category.id,
      storeId: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 6
    };
    let self = this;
    self.storeService.getProductList(options).then((data) => {
      if (clearProduct) {
        self.product = [];
        self.nextPage = true;
      }
      self.product = self.product.concat(data.results);

      if (self.isFirstHomeProduct) {
        self.homeProduct = self.product;
        self.isFirstHomeProduct = false;
      }

      if (data.next == null) {
        self.nextPage = false;
      }
    });
  }

  ngOnDestroy() {

  }

  openNavigationDialog(event?: any) {
    if (event) {
      this.changeViewIndex(event);
      return this.isDialogOpen = false;
    }
    this.isDialogOpen = !this.isDialogOpen;
  }

  changeViewIndex(index): void {
    this.viewIndex = index;
  }

  jumpProductList(): void {
    this.viewIndex = 1;
  }

  close() {
    this.router.navigate(['/shop/store/templates']);
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
        uid: 4,
        storeId: this.store.id,
        context: {
          nameTag: this.nameTag,
          titleTag: this.titleTag,
          aboutMeTag: this.aboutMeTag,
          productTitleTag: this.productTitleTag,
          productDesTag: this.productDesTag,
        },
        image: {
          imageBanner: this.imageBanner,
          aboutMeCover: this.aboutMeCover,
          imageAdOne: this.imageAdOne,
          imageAdTwo: this.imageAdTwo,
          imageAdThree: this.imageAdThree,
        }
      };
      this.shopService.createMultiTemplate(options).then((data) => {
        data.context = options.context;
        data.image = options.image;
        self.templateList.push(data);
        self.shopService.setTemplateUId(2);
        self.shopService.createTemplate({
          storeId: self.store.id,
          templateId: data.id
        }).then((data) => {
          self.shopService.setTemplateList(self.templateList);
        });
        self.openDialog(`${self.store.displayName}`);
        self.router.navigate(['/shop/store/templates']);
      });
    } else {
      let options = {
        id: this.templateId,
        context: {
          nameTag: this.nameTag,
          titleTag: this.titleTag,
          aboutMeTag: this.aboutMeTag,
          productTitleTag: this.productTitleTag,
          productDesTag: this.productDesTag,
        },
        image: {
          imageBanner: this.imageBanner,
          aboutMeCover: this.aboutMeCover,
          imageAdOne: this.imageAdOne,
          imageAdTwo: this.imageAdTwo,
          imageAdThree: this.imageAdThree,
        }
      };
      this.shopService.updateMultiTemplate(options).then((data) => {
        let index = self.templateList.find((item) => {
          if (item.id == data.id) {
            return true;
          }
        });
        self.templateList.splice(index, 1);
        data.context = options.context;
        data.image = options.image;
        self.templateList.push(data);
        self.shopService.setTemplateUId(4);
        self.shopService.createTemplate({
          storeId: self.store.id,
          templateId: data.id
        }).then((data) => {
          self.shopService.setTemplateList(self.templateList);
        });
        self.openDialog(`${self.store.displayName}`);
        self.router.navigate(['/shop/store/templates']);
      });
    }
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

  blog: any = [];
  isHaveBlog=true;

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
      self.isHaveBlog =self.blog.length != 0;
      if (data.next == null) {
        self.nextBlogPage = false;
      }
    });
  }

}
