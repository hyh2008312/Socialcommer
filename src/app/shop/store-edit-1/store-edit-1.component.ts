import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserProfile, Store} from '../shop';

import {UserService} from '../../shared/services/user/user.service';
import {ShopService} from '../shop.service';
import {ConstantService} from '../../shared/services/constant/constant.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {StoreShareDialogComponent} from "../store-share-dialog/store-share-dialog.component";

@Component({
  selector: 'app-store-edit-1',
  templateUrl: './store-edit-1.component.html',
  styleUrls: ['../../store/store.scss', '../shop.scss']
})

export class StoreEditComponent implements OnInit {

  public categories: any = [];
  public category: any = {};
  public shareLink: string;
  public text = '';

  page = 1;
  nextPage: boolean = true;
  product: any = [];

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
  store: Store = new Store();
  userProfile: UserProfile = new UserProfile();
  previewImgFile: any = null;
  previewImgSrcs: any = null;
  countries: Object[];
  userCountry: string = '';

  templateList: any = [];
  templateId: any = false;
  ownerId: any;


  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private shopService: ShopService,
              private constant: ConstantService,
              private dialog: MatDialog) {

    this.countries = this.constant.getCountries();

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

    let firstLoad = false;

    self.shopService.templateList.subscribe((data) => {
      if (data) {
        self.templateList = data;
        self.userService.store.subscribe((data) => {
          if (data) {
            self.store = data;
            self.nameTag = data.name;
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
                self.queryProduct(false);
              });

              for (let value of self.templateList) {
                if (value.templateId == 8) {

                  self.templateId = value.id;
                  self.nameTag = value.context.nameTag != '' ? value.context.nameTag : self.nameTag;
                  self.titleTag = value.context.titleTag != '' ? value.context.titleTag : self.titleTag;
                  self.descriptionTag = value.context.descriptionTag != '' ? value.context.descriptionTag : self.descriptionTag;
                  self.userTag = value.context.descriptionTag != '' ? value.context.userTag : self.userTag;

                  self.imageSrc = value.images.imageSrc;
                  break;
                }
              }
            }
          }
        })
      }
    });

  }

  ngOnInit(): void {

    this.shareLink = window.location.host + '/store/';

    let self = this;
    self.shopService.getUserProfile().then((data) => {
      self.userProfile = data;

      self.previewImgSrcs = data.avatar;
      self.previewImgFile = data.avatar;

      for (let value of self.constant.getCountries()) {
        if (value.code == data.country) {
          self.userCountry = value.name;
          break;
        }
      }
    });

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

  }

  storeTemplateForm: FormGroup;
  storeForm: FormGroup;

  nameTag = 'STORE NAME';
  titleTag = '<p class="ql-align-center"><strong class="ql-size-huge" style="color: rgb(255, 255, 255);">Welcome to The Beauty Store!</strong></p>';
  descriptionTag = '<p class="ql-align-center"><strong style="color: rgb(255, 255, 255);" class="ql-size-large">Follow beauty tips and find unique high-quality makeup tools, cosmetics and hairstyles all in once place.</strong></p>';
  userTag = '<p>Welcome to my curated online store. This is a place to share you with beauty tips and high-quality unique makeup tools, cosmetics, hairstyles and everyday essentials. Please browse my collections and grab an item!</p>';
  imageSrc = 'https://media.xberts.com/collector/source/web/templats/01-pic-7.jpg';

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

    self.userProfile.avatar = this.previewImgFile;
    self.shopService.changeUserProfile(self.userProfile);

    if (!this.templateId) {
      let options = {
        templateId: 1,
        storeId: this.store.id,
        context: {
          nameTag: this.nameTag,
          titleTag: this.titleTag,
          descriptionTag: this.descriptionTag,
          userTag: this.userTag
        },
        images: {
          imageSrc: this.imageSrc
        }
      };
      this.shopService.createMultiTemplate(options).then((data) => {
        data.context = options.context;
        data.images = options.images;
        self.templateList.unshift(data);
        self.shopService.setTemplateUId(1);
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
          userTag: this.userTag
        },
        images: {
          imageSrc: this.imageSrc
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
        self.shopService.setTemplateUId(1);
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

  queryProduct(clearProduct?: boolean) {
    if (this.categories.length <= 0) {
      return;
    }
    let options = {
      cat: this.category.id,
      store: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 12
    };
    let self = this;
    self.shopService.getTemplateProductList(options).then((data) => {
      if (clearProduct) {
        this.product = [];
        this.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if (data.next == null) {
        self.nextPage = false;
      }
    });
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

  // 跳转到商品详情页
  selectProductId: any;
  goodsDetail: boolean = false;

  jumpGoodsDetail(productId: any) {
    this.selectProductId = productId;
    this.changeGoodsDetail();
  }

  changeGoodsDetail() {
    this.goodsDetail = !this.goodsDetail;
  }

  titleInput:any;
  getTitleInputEdit(textedit: any): void {
    this.titleInput = textedit ;
  }

  editTitleInput():void{
    this.titleInput.setSelection(0, this.titleInput.getLength(),'user');
  }

  desInput:any;
  getDesInputEdit(textedit: any): void {
    this.desInput = textedit ;
  }

  editDesInput():void{
    this.desInput.setSelection(0, this.desInput.getLength(),'user');
  }
  aboutInput:any;
  getAboutInputEdit(textedit: any): void {
    this.aboutInput = textedit ;
  }

  editAboutInput():void{
    this.aboutInput.setSelection(0, this.aboutInput.getLength(),'user');
  }



}
