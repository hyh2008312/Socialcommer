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
  styleUrls: ['../store-template-2-edit.scss']
})

export class MainPageComponent implements OnInit {
  imageHomeMade: string = 'https://media.socialcommer.com/source/web/pic/pic-2-5.jpg';

  shareLink: string;
  ratio: any;

  viewIndex: number;
  //定义字段
  nameTag = 'STORE NAME';

  titleTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">Click here to edit the title</strong></p>';

  descriptionTag = '<p class="ql-align-center"><strong style="color: rgb(255, 255, 255);">This was founded with starter site, a single page ' +
    'online storefront. All of the images and text on this page can be changed to personalize the site for brand ' +
    'and to communicate your unique story to your customers.</strong></p>';

  aboutMeTag = '<p>Here you let your customers get to know you. Tell them a little bit about ' +
    'yourself and why you create this business. Show your customers that there are real people with ' +
    'interesting stories working behind the scenes.</p>';

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

  changeAboutMe($event) {
    this.aboutMeTag = $event;
    this.aboutMeNewTag = $event;

  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private fb: FormBuilder,
              private userService: UserService,
              private shopService: ShopService,
              private dialog: MatDialog) {
    this.viewIndex = 0;
    this.ratio = 1920/270 ;
    let self = this;
    self.storeTemplateForm = self.fb.group({
      nameTag: [self.nameTag],
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
              });
              for (let value of self.templateList) {
                if (value.templateId == 2) {

                  self.templateId = value.id;
                  self.nameTag = value.context.nameTag != '' ? value.context.nameTag : self.nameTag;
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
    this.router.navigate(['/shop/dashboard']);
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
          nameTag: this.nameTag,
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

}
