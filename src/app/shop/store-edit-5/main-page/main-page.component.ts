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
  styleUrls: ['../store-template-5.scss']
})

export class MainPageComponent implements OnInit {
  //测试数据
  categoryProduct = [{
    'id': 1,
    'name': 'T-shirt',
    'product': [
      {
        'id': 1,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
      },
      {
        'id': 2,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
      },
      {
        'id': 3,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
      }
    ]
  }, {
    'id': 2,
    'name': 'shirt',
    'product': [
      {
        'id': 1,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
      },
      {
        'id': 2,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
      },
      {
        'id': 3,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
      }
    ]
  }, {
    'id': 3,
    'name': 'shoes',
    'product': [
      {
        'id': 1,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623089.jpg'
      },
      {
        'id': 2,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623090.jpg'
      },
      {
        'id': 3,
        'title': 'Product Name',
        'salePriceAmount': '12',
        'salePriceCurrency': 'USD',
        'originalPriceAmount': '16',
        'originalPriceCurrency': 'USD',
        'imageUrl': 'https://media.socialcommer.com/source/web/template/5/fashion-1623086.jpg'
      }
    ]
  }];

  shareLink: string;
  ratio: any;
  // 决定导航条的显示问题
  viewIndex: number = 0;  // 显示第几个
  isCategory: boolean = false; // 开始显示是否为分类


  //定义字段
  nameTag = 'STORE NAME';
  titleTag = '<div >Click here to edit the title</div>';
  aboutMeTitleTag = '<div> Here you let your customers get to know you. Tell them a little bit about ' +
    'yourself and why you create this business. Show your customers that there are real people with ' +
    'interesting stories working behind the scenes.</div>';
  aboutMeDesTag = '';
  blogTitleTag = 'Blog';
  blogDesTag = '';

  uploadAboutType = 'COLLECTOR_STORE_TEMPLATE';
  text = '';
  //第五套模版需要数据
  imageBanner: string = 'https://media.socialcommer.com/source/web/template/5/people-2583848.jpg';
  imageAboutCover: string = 'https://media.socialcommer.com/source/web/template/5/people-2593366.jpg';
  imageBlogCover: string = 'https://media.socialcommer.com/source/web/template/5/people-2599856.jpg';


  // 图片链接（第四套模版）(最后将其删除)
  aboutMeCover = 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg';
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
      productTitleTag: [self.aboutMeDesTag],
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
                self.categories = [...data.category];
                self.category = self.categories[0];
                self.queryProduct();
                self.queryBlog();
              });

              for (let value of self.templateList) {
                if (value.uid == 5) {
                  self.templateId = value.id;
                  self.nameTag = value.context.nameTag != '' ? value.context.nameTag : self.nameTag;
                  self.titleTag = value.context.titleTag != '' ? value.context.titleTag : self.titleTag;
                  self.aboutMeDesTag = value.context.aboutMeDesTag != '' ? value.context.aboutMeDesTag : self.aboutMeDesTag;
                  self.blogTitleTag = value.context.blogTitleTag != '' ? value.context.blogTitleTag : self.blogTitleTag;
                  self.blogDesTag = value.context.blogDesTag != '' ? value.context.blogDesTag : self.blogDesTag;
                  self.aboutMeTitleTag = value.context.aboutMeTitleTag != '' ? value.context.aboutMeTitleTag : self.aboutMeTitleTag;

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

  changeNavigation(index): void {
    this.viewIndex = index;
  }

  changeCategoryNavigation(category) {
    this.viewIndex = 2;
    this.category = category;
    this.page = 1;
    this.queryProduct(true);
  }

  queryMoreProduct() {
    this.page++;
    this.queryProduct(false);
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

      if (data.next == null) {
        self.nextPage = false;
      }
    });
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
        uid: 5,
        storeId: this.store.id,
        context: {
          nameTag: this.nameTag,
          titleTag: this.titleTag,
          aboutMeTitleTag: this.aboutMeTitleTag,
          aboutMeDesTag: this.aboutMeDesTag,
          blogTitleTag: this.blogTitleTag,
          blogDesTag: this.blogDesTag,
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
          aboutMeTitleTag: this.aboutMeTitleTag,
          blogTitleTag: this.blogTitleTag,
          blogDesTag: this.blogDesTag,
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
  homeBlog: any = [];

  queryBlog(clearBlog?: boolean) {
    if (!this.ownerId) {
      return;
    }
    let options = {
      ownerId: this.ownerId,
      page: this.page,
      page_size: 6
    };
    let self = this;
    self.storeService.getBlog(options).then((data) => {
      if (clearBlog) {
        self.blog = [];
        self.nextBlogPage = true;
      }
      self.blog = self.blog.concat(data.results);
      for (let i = 0; i < self.blog.length; i++) {
        if (i < 2) {
          self.homeBlog.push(self.blog[i]);
        } else {
          break;
        }
      }
      if (data.next == null) {
        self.nextBlogPage = false;
      }
    });
  }

}
