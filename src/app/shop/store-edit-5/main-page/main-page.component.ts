import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
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
  styleUrls: ['../_store-template-5.scss']
})

export class MainPageComponent implements OnInit, AfterViewInit {
  //测试数据
  categoryProduct: any = [];

  shareLink: string;
  ratio: any;
  ratioBanner: any;
  // 决定导航条的显示问题
  viewIndex: number = 0;  // 显示第几个

  navigationIndex: number = 0;   // 导航栏上边的角标
  isCategory: boolean = false; // 开始显示是否为分类


  //定义字段
  nameTag = 'STORE NAME';
  desTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">' +
    'We bring you the best style inspirations and outfit ideas!</strong></p>';

  aboutMeTitleTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">' +
    'Welcome to my store!</strong></p>';
  aboutMeDesTag = '<div> Confucius once said that “everything has its beauty but not everyone sees it”.This definitely does not apply to our range of tops and shirts!<br>' +
    '<br>Our range of eco-friendly,nature inspired clothes is the result of countless hours of work. Made of high quality bamboo viscose,we believe that style should be accessible to anyone.</div>';

  blogDesTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">' +
    'The latest fashion trends, styles and inspirations.</strong></p>';

  uploadAboutType = 'COLLECTOR_STORE_TEMPLATE';
  text = '';
  //第五套模版需要数据
  imageBanner: string = 'https://media.socialcommer.com/source/web/template/5/banner_1.jpg';
  imageAboutCover: string = 'https://media.socialcommer.com/source/web/template/5/about_2.jpg';
  imageBlogCover: string = 'https://media.socialcommer.com/source/web/template/5/blog_3.jpg';


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
  desEdited: boolean = false;


  aboutMeTitleEdited: boolean = false;
  aboutMeDesEdited: boolean = false;

  contactUsEdited: boolean = false;
  blogDesEdited: boolean = false;

  imageBannerEdited: boolean = false;
  imageBlogCoverEdited: boolean = false;
  storeEdited: boolean = false;

  editBannerImage() {
    this.imageBannerEdited = !this.imageBannerEdited;
  }

  editBlogCoverImage() {
    this.imageBlogCoverEdited = !this.imageBlogCoverEdited;
  }

  editName() {
    this.nameEdited = !this.nameEdited;
  }

  editDes() {
    this.desEdited = !this.desEdited;
  }

  editAboutTitleMe() {
    this.aboutMeTitleEdited = !this.aboutMeTitleEdited;
  }

  editAboutDesMe() {
    this.aboutMeDesEdited = !this.aboutMeDesEdited;
  }

  editContactUsTitle() {
    this.contactUsEdited = !this.contactUsEdited;
  }

  editBlogDes() {
    this.blogDesEdited = !this.blogDesEdited;
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
    this.ratio = 1920 / 560;
    this.ratioBanner = 1920 / 645;
    let self = this;
    self.storeTemplateForm = self.fb.group({
      nameTag: [self.nameTag],
      desTag: [self.desTag],
      aboutMeTitleTag: [self.aboutMeTitleTag],
      aboutMeDesTag: [self.aboutMeDesTag],
      blogDesTag: [self.blogDesTag],


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


  public categories: any = [];
  public category: any = {
    id: null,
    name: ''
  };
  public homeCategories: any = [];

  page = 1;
  nextPage: boolean = true;
  nextBlogPage: boolean = true;
  product: any = [];
  homeProduct: any = [];

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
            self.nameTag = data.name;
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
              self.shopService.getCategoryProduct(self.store.displayName).then((data) => {
                self.categoryProduct = data;
              });
              if (self.templateList != null) {
                for (let value of self.templateList) {
                  if (value.templateId == 5) {
                    self.templateId = value.id;
                    self.nameTag = value.context.nameTag != '' ? value.context.nameTag : self.nameTag;
                    self.desTag = value.context.desTag != '' ? value.context.desTag : self.desTag;
                    self.aboutMeTitleTag = value.context.aboutMeTitleTag != '' ? value.context.aboutMeTitleTag : self.aboutMeTitleTag;
                    self.aboutMeDesTag = value.context.aboutMeDesTag != '' ? value.context.aboutMeDesTag : self.aboutMeDesTag;
                    self.blogDesTag = value.context.blogDesTag != '' ? value.context.blogDesTag : self.blogDesTag;

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
                    self.imageBanner = value.images.imageBanner;
                    self.imageAboutCover = value.images.imageAboutCover;
                    self.imageBlogCover = value.images.imageBlogCover;
                    break;
                  }
                }
              }
            }
          }
        })
      }
    });
  }

  changeCategory() {
    this.page = 1;
    this.queryProduct(true);
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


  jumpCategory(index: number): void {
    this.viewIndex = index;
    this.isCategory = true;
    this.category = this.categoryProduct[index];
    this.changeCategory();
  }


  changeNavigation(index): void {
    this.viewIndex = index;
    this.isCategory = false;
  }

  changeCategoryNavigation(categoryMain: any) {
    this.isCategory = true;
    this.viewIndex = categoryMain.index;
    this.category = categoryMain.category;
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
      cat: this.category.id,
      store: this.store.id,
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
        templateId: 5,
        storeId: this.store.id,
        context: {
          nameTag: this.nameTag,
          desTag: this.desTag,
          aboutMeTitleTag: this.aboutMeTitleTag,
          aboutMeDesTag: this.aboutMeDesTag,
          blogDesTag: this.blogDesTag,
          blogFlag: this.blogFlag
        },
        images: {
          imageBanner: this.imageBanner,
          imageAboutCover: this.imageAboutCover,
          imageBlogCover: this.imageBlogCover,
        }
      };
      this.shopService.createMultiTemplate(options).then((data) => {
        data.context = options.context;
        data.images = options.images;
        self.templateList.unshift(data);
        self.shopService.setTemplateUId(5);
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
          desTag: this.desTag,
          aboutMeTitleTag: this.aboutMeTitleTag,
          aboutMeDesTag: this.aboutMeDesTag,
          blogDesTag: this.blogDesTag,
          blogFlag: this.blogFlag
        },

        images: {
          imageBanner: this.imageBanner,
          imageAboutCover: this.imageAboutCover,
          imageBlogCover: this.imageBlogCover,

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
        self.shopService.setTemplateUId(5);
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

  // 跳转到商品详情页
  selectProductId: any;
  goodsDetail: boolean = false;

  jumpGoodsDetail(productId: any) {
    this.selectProductId = productId;
    this.changeGoodsDetail(2);
  }

  changeGoodsDetail(viewNum: number) {
    this.viewIndex = viewNum;
    this.isCategory = false;
  }

  // 跳转到购物车页面
  storeCart: boolean = false;

  jumpStoreCart() {
    this.storeCart = !this.storeCart;
  }

  // 跳转到订单页面
  storeOrder: boolean = false;

  jumpStoreOrder() {
    this.storeOrder = !this.storeOrder;
  }

  OpenStoreOrder() {
    this.storeOrder = true;
    this.storeCart = false;
  }
  OpenStoreCart() {
    this.storeOrder = false;
    this.storeCart = true;
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

  ngAfterViewInit() {
    if (document.getElementById('xb-5-template-to-top')) {
      document.getElementById('xb-5-template-to-top').scrollTop = 0;
    }
  }

  changeFixed(): void {
    let Atheight = document.getElementById('xb-5-template-to-top').scrollTop;
    let cartHeight = document.getElementById('xb-5-detail-top').offsetHeight;
    let detialHeight = document.getElementById('xb-5-goods').offsetHeight;
    let ele = document.getElementById('xb-5-detail-top');
    if (Atheight + cartHeight >= detialHeight) {
      ele.style.position = 'absolute';
      ele.style.top = (detialHeight + 208 - cartHeight) + "px";
    } else {
      ele.style.position = 'fixed';
      ele.style.top = "auto";
    }
  }

  desInput: any;

  getDesInputEdit(textedit: any): void {
    this.desInput = textedit;
  }

  editDesInput(): void {
    this.desInput.setSelection(0, this.desInput.getLength(), 'user');
  }

  aboutTitleInput: any;

  getAboutTitleInputEdit(textedit: any): void {
    this.aboutTitleInput = textedit;
  }

  editAboutTitleInput(): void {
    this.aboutTitleInput.setSelection(0, this.aboutTitleInput.getLength(), 'user');
  }

  aboutDesInput: any;

  getAboutDesInputEdit(textedit: any): void {
    this.aboutDesInput = textedit;
  }

  editAboutDesInput(): void {
    this.aboutDesInput.setSelection(0, this.aboutDesInput.getLength(), 'user');
  }

  blogDesInput: any;

  getBlogDesInputEdit(textedit: any): void {
    this.blogDesInput = textedit;
  }

  editBlogDesInput(): void {
    this.blogDesInput.setSelection(0, this.blogDesInput.getLength(), 'user');
  }


}
