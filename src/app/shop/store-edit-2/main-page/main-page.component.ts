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
  styleUrls: ['../_store-template-2-edit.scss']
})

export class MainPageComponent implements OnInit, AfterViewInit {
  imageHomeMade: string = 'https://media.socialcommer.com/source/web/pic/pic-2-5.jpg';

  shareLink: string;
  ratio: any;

  viewIndex: number;
  //定义字段
  nameTag = 'STORE NAME';

  titleTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">A Curated Store for Affordable Everyday Essentials </strong></p>';

  descriptionTag = '<p class="ql-align-center"><strong style="color: rgb(255, 255, 255);">Shop our exclusive collections of gadgets, kitchen tools, cookware, and more.</strong></p>';

  aboutMeTag = '<p>Welcome to my curated store. This is a place to share my favorite high-quality unique kitchen gadgets,' +
    ' cookware, bakeware, and lifestyle stuffs, etc. Please browse my collections and grab your favorite items!</p>';

  aboutMeNewTag = '<p>Here you let your customers get to know you. Tell them a little bit about ' +
    'yourself and why you create this business. Show your customers that there are real people with ' +
    'interesting stories working behind the scenes.</p>';

  aboutMeOneImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-2.jpg';
  aboutMeTwoImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-3.jpg';
  aboutMeCover = 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg';

  homeMadeDesTag = '<p>Do you have a passion, hobby or life experience that inspired you to get started?' +
    ' Do you have special skills that make you an expert in your field?  ' +
    'Helping customers feel connected to you and your purpose will' +
    ' inspire more trust in your brand.</p>';

  homeMadeTitle = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">Shop My Favorite Collections</strong></p>';

  homeMadeOneImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-4.jpg';
  homeMadeTwoImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-6.jpg';

  bannerImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-1.jpg';

  uploadAboutType = 'COLLECTOR_STORE_TEMPLATE';
  text = '';

  isHavePromotion: boolean = false;

  //是否为新手引导
  isGuide: boolean = false;
  isApproved: boolean = false;
  sub: any;

  public editorConfig = {
    theme: 'bubble',
    readOnly: true,
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
  descriptionEdited: boolean = false;
  aboutMeEdited: boolean = false;
  aboutMeNewEdited: boolean = false;
  homeMadeDesEdited: boolean = false;
  homeMadeTitleEdited: boolean = false;
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

  editDescription() {
    this.descriptionEdited = !this.descriptionEdited;
  }


  editAboutMe() {
    this.aboutMeEdited = !this.aboutMeEdited;
  }

  editAboutMeNew() {
    this.aboutMeNewEdited = !this.aboutMeNewEdited;
  }

  editHomeMadeDes() {
    this.homeMadeDesEdited = !this.homeMadeDesEdited;
  }

  editHomeMadeTitle() {
    this.homeMadeTitleEdited = !this.homeMadeTitleEdited;
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
    let url = this.router.url;
    this.isGuide = url.indexOf('guide/edit') >= 0;
    this.viewIndex = 0;
    this.ratio = 1920 / 270;
    let self = this;
    self.storeTemplateForm = self.fb.group({
      titleTag: [self.titleTag],
      descriptionTag: [self.descriptionTag],
      aboutMeTag: [self.aboutMeTag],
      aboutMeNewTag: [self.aboutMeNewTag],
      homeMadeDesTag: [self.homeMadeDesTag],
      homeMadeTitle: [self.homeMadeTitle]
    });
    self.storeForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      displayName: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9\.-]*$')
      ]]
    });

    this.storeForm.valueChanges.subscribe(data => this.onValueChanged(data));

    self.sub = self.userService.currentUser.subscribe((data) => {
      if(data) {
        self.isApproved = data.isInvite;
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
      'required': 'This field is required.',
      'pattern': 'Permalink only lowercase alphanumeric and "-" allowed.'
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
  page = 1;
  nextPage: boolean = true;
  nextBlogPage: boolean = true;
  product: any = [];

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
                self.isHavePromotion = data.promotionNum > 0;
                let tempCategory = data.category.filter((data) => {
                  return data.goodsCount != 0;
                });
                if (tempCategory.length > 1) {
                  self.categories = [{name: 'All'}, ...tempCategory];
                } else {
                  self.categories = [...tempCategory];
                }
                self.category = self.categories[0];
                self.queryProduct();
                self.queryFlashSale();
              });
              for (let value of self.templateList) {
                if (value.templateId == 2) {

                  self.templateId = value.id;
                  self.titleTag = value.context.titleTag != '' ? value.context.titleTag : self.titleTag;
                  self.descriptionTag = value.context.descriptionTag != '' ? value.context.descriptionTag : self.descriptionTag;
                  self.aboutMeTag = value.context.aboutMeTag != '' ? value.context.aboutMeTag : self.aboutMeTag;
                  self.aboutMeNewTag = value.context.aboutMeNewTag != '' ? value.context.aboutMeNewTag : self.aboutMeNewTag;
                  self.homeMadeDesTag = value.context.homeMadeDesTag != '' ? value.context.homeMadeDesTag : self.homeMadeDesTag;
                  self.homeMadeTitle = value.context.homeMadeTitle != '' ? value.context.homeMadeTitle : self.homeMadeTitle;

                  self.imageHomeMade = value.images.imageHomeMade;
                  self.bannerImageStr = value.images.bannerImageStr;
                  self.aboutMeCover = value.images.aboutMeCover;
                  self.aboutMeOneImageStr = value.images.aboutMeOneImageStr;
                  self.aboutMeTwoImageStr = value.images.aboutMeTwoImageStr;
                  self.homeMadeOneImageStr = value.images.homeMadeOneImageStr;
                  self.homeMadeTwoImageStr = value.images.homeMadeTwoImageStr;
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


  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      return;
    }
    let options = {
      cat: this.category.id,
      store: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 48
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

  flashPage = 1;
  nextFlashSalePage: boolean = false;
  flashSaleProduct: any = [];

  queryFlashSale(clearProduct?: boolean) {
    let options = {
      store: this.store.id,
      page: this.flashPage,
      page_size: 48
    };
    let self = this;
    self.shopService.getFlashSaleList(options).then((data) => {
      if (clearProduct) {
        self.flashSaleProduct = [];
        self.nextFlashSalePage = true;
      }
      self.flashSaleProduct = self.flashSaleProduct.concat(data.results);
      if (data.next == null) {
        self.nextFlashSalePage = false;
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
    this.viewIndex = 2;
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
        templateId: 2,
        storeId: this.store.id,
        context: {
          titleTag: this.titleTag,
          descriptionTag: this.descriptionTag,
          aboutMeTag: this.aboutMeTag,
          aboutMeNewTag: this.aboutMeNewTag,
          homeMadeDesTag: this.homeMadeDesTag,
          homeMadeTitle: this.homeMadeTitle
        },
        images: {
          imageHomeMade: this.imageHomeMade,
          bannerImageStr: this.bannerImageStr,
          aboutMeCover: this.aboutMeCover,
          aboutMeOneImageStr: this.aboutMeOneImageStr,
          aboutMeTwoImageStr: this.aboutMeTwoImageStr,
          homeMadeOneImageStr: this.homeMadeOneImageStr,
          homeMadeTwoImageStr: this.homeMadeTwoImageStr,
        }
      };
      this.shopService.createMultiTemplate(options).then((data) => {
        data.context = options.context;
        data.images = options.images;
        self.templateList.unshift(data);
        self.shopService.setTemplateUId(2);
        self.shopService.createTemplate({
          storeId: self.store.id,
          storeTemplateId: data.id
        }).then((data) => {
          self.shopService.setTemplateList(self.templateList);
        });
        if (self.isGuide) {
          self.openGuideDialog(`${self.store.displayName}`);
        } else {
          self.openDialog(`${self.store.displayName}`);
          self.router.navigate(['/shop/dashboard']);
        }
      });
    } else {
      let options = {
        id: this.templateId,
        context: {
          titleTag: this.titleTag,
          descriptionTag: this.descriptionTag,
          aboutMeTag: this.aboutMeTag,
          aboutMeNewTag: this.aboutMeNewTag,
          homeMadeDesTag: this.homeMadeDesTag,
          homeMadeTitle: this.homeMadeTitle
        },
        images: {
          imageHomeMade: this.imageHomeMade,
          bannerImageStr: this.bannerImageStr,
          aboutMeCover: this.aboutMeCover,
          aboutMeOneImageStr: this.aboutMeOneImageStr,
          aboutMeTwoImageStr: this.aboutMeTwoImageStr,
          homeMadeOneImageStr: this.homeMadeOneImageStr,
          homeMadeTwoImageStr: this.homeMadeTwoImageStr,
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
        self.shopService.setTemplateUId(2);
        self.shopService.createTemplate({
          storeId: self.store.id,
          storeTemplateId: data.id
        }).then((data) => {
          self.shopService.setTemplateList(self.templateList);
        });
        if (self.isGuide) {
          self.openGuideDialog(`${self.store.displayName}`);
        } else {
          self.openDialog(`${self.store.displayName}`);
          self.router.navigate(['/shop/dashboard']);
        }
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

  openGuideDialog(displayName?: any): void {
    let self = this;
    if(self.isApproved) {
      (<any>window).dataLayer.push({
        'event': 'VirtualPageView',
        'virtualPageURL': '/storesetup/complete',
        'virtualPageTitle': 'StoreSetup - Complete'
      });
      self.router.navigate(['/shop/listings/item'], {replaceUrl: true});
    } else {
      self.router.navigate(['/shop/guide'], {replaceUrl: true}).then(() => {
        let step = 'finished';
        self.shopService.changeGuideStep({
          step
        }).then((data) => {
          self.userService.addStore(data);
        });
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


  // 跳转到商品详情页
  selectProductId: any;
  goodsDetail: boolean = false;

  jumpGoodsDetail(productId: any) {
    this.selectProductId = productId;
    this.changeGoodsDetail();
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

  openStoreOrder() {
    this.storeOrder = true;
    this.storeCart = false;
  }

  openStoreCart() {
    this.storeOrder = false;
    this.storeCart = true;
  }

  changeGoodsDetail() {
    this.goodsDetail = !this.goodsDetail;
  }

  ngAfterViewInit() {
    if (document.getElementById('xb-1-template-to-top')) {
      document.getElementById('xb-1-template-to-top').scrollTop = 0;
    }
  }


  titleInput: any;

  getTitleInputEdit(textedit: any): void {
    this.titleInput = textedit;
  }

  editTitleInput(): void {
    this.titleInput.enable(true);
    this.titleInput.setSelection(0, this.titleInput.getLength(), 'user');
  }

  desInput: any;

  getDesInputEdit(textedit: any): void {
    this.desInput = textedit;
  }

  editDesInput(): void {
    this.desInput.enable(true);
    this.desInput.setSelection(0, this.desInput.getLength(), 'user');
  }


  aboutMeInput: any;

  getAboutMeInputEdit(textedit: any): void {
    this.aboutMeInput = textedit;
  }

  editAboutMeInput(): void {
    this.aboutMeInput.enable(true);
    this.aboutMeInput.setSelection(0, this.aboutMeInput.getLength(), 'user');
  }

  aboutMeNewInput: any;

  getAboutMeNewInputEdit(textedit: any): void {
    this.aboutMeNewInput = textedit;
  }

  editAboutMeNewInput(): void {
    this.aboutMeNewInput.enable(true);
    this.aboutMeNewInput.setSelection(0, this.aboutMeNewInput.getLength(), 'user');
  }

  homeMadeDesInput: any;

  getHomeMadeDesInputEdit(textedit: any): void {
    this.homeMadeDesInput = textedit;
  }

  editHomeMadeDesInput(): void {
    this.homeMadeDesInput.enable(true);
    this.homeMadeDesInput.setSelection(0, this.homeMadeDesInput.getLength(), 'user');
  }

  homeMadeTitleInput: any;

  getHomeMadeTitleInputEdit(textedit: any): void {
    this.homeMadeTitleInput = textedit;
  }

  editHomeMadeTitleInput(): void {
    this.homeMadeTitleInput.enable(true);
    this.homeMadeTitleInput.setSelection(0, this.homeMadeTitleInput.getLength(), 'user');
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
