import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserProfile,Store } from '../shop';

import { UserService } from  '../../shared/services/user/user.service';
import { ShopService } from '../shop.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoreShareDialogComponent } from "../store-share-dialog/store-share-dialog.component";

@Component({
  selector: 'app-store-edit-1',
  templateUrl: './store-edit-1.component.html',
  styleUrls: ['../../store/store.scss','../shop.scss']
})

export class StoreEditComponent implements OnInit {

  public categories:any = [];
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
        [{ 'align': [] }],
        [{ 'color': [] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
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

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private shopService: ShopService,
    private constant: ConstantService,
    private dialog: MatDialog
  ) {

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
    self.userService.store.subscribe((data)=> {
      if(data) {
        self.store = data;
        if(!firstLoad) {
          firstLoad = true;
          self.nameTag = self.store.nameTag != ''? self.store.nameTag : self.nameTag;
          self.titleTag = self.store.titleTag != ''? self.store.titleTag : self.titleTag;
          self.descriptionTag = self.store.descriptionTag != ''? self.store.descriptionTag : self.descriptionTag;
          self.userTag = self.store.descriptionTag != ''? self.store.userTag : self.userTag;
          self.storeForm.setValue({
            name: self.store.name,
            description : self.store.description,
            displayName: self.store.displayName
          });

          self.imageSrc = self.store.imageUrl;

          self.shopService.getFrontStore(self.store.displayName).then((data) => {
            if(data.category.length > 1) {
              self.categories = [{name: 'All'}, ...data.category];
            } else {
              self.categories = [...data.category];
            }

            self.category = self.categories[0];
            self.queryProduct(false);
          });
        }
      }
    })

  }

  ngOnInit():void {

    this.shareLink = window.location.host + '/store/';

    let self = this;
    self.shopService.getUserProfile().then((data) => {
      self.userProfile = data;

      self.previewImgSrcs = data.avatar;
      self.previewImgFile = data.avatar;

      for(let value of self.constant.getCountries()) {
        if(value.code == data.country) {
          self.userCountry = value.name;
          break;
        }
      }
    });

    self.shopService.getStore()

  }

  //存储错误信息
  formErrors = {
    'name': '',
    'displayName':'',
    'description': ''
  };
  //错误对应的提示
  validationMessages = {
    'name': {
      'required': 'This field is required.'
    },
    'displayName':{
      'required': 'This field is required.'
    },
    'description':{
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
  titleTag = '<div class="xb-shop__template-title">Click here to edit the title</div>';
  descriptionTag = '<div class="xb-shop__template-description">This is your starter site, a single page online storefront. All of the images and text on this page can be changed to personalize the site for brand and to communicate your unique story to your customers.</div>';
  userTag = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business. Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training that make you an expert in your field? Show your customers that there are real people with interesting stories working behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust in your brand.';
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
    this.router.navigate(['/shop/store/templates']);
  }

  submitTemplate() {
    if(!this.storeForm.valid) {
      this.storeEdited = true;
      return;
    }
    if(!this.storeTemplateForm.valid) {
      return;
    }

    let user = this.userProfile;
    user.avatar = this.previewImgFile;
    let self = this;
    this.shopService.changeUserProfile(user).then((data) => {

      let option = self.storeTemplateForm.value;

      self.shopService.createTemplate({
        storeId: self.store.id,
        nameTag: option.nameTag,
        titleTag: option.titleTag,
        userTag: option.userTag,
        descriptionTag: option.descriptionTag,
        imageUrl: self.imageSrc,
        templateId: 1
      }).then((data) => {
        self.shopService.setTemplateUId(1);
        self.openDialog(self.store.displayName);
        self.router.navigate(['/shop/store/templates']);

        self.userService.getUser().then((data)=> {
          self.userService.addUser(data);
          self.userService.addStore(data.store[0]);
        });
      })
    });

  }

  changeStore() {
    if(!this.storeForm.valid) {
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

  queryProduct(clearProduct?:boolean)  {
    if(this.categories.length <= 0) {
      return;
    }
    let options = {
      categoryId: this.category.id,
      storeId: this.store.id,
      relationStatus: 'published',
      page: this.page,
      page_size: 12
    };
    let self = this;
    self.shopService.getTemplateProductList(options).then((data)=>{
      if(clearProduct) {
        this.product = [];
        this.nextPage = true;
      }
      self.product = self.product.concat(data.results);
      if(data.next == null) {
        self.nextPage = false;
      }
    });
  }

  openDialog(displayName?:any): void {
    let dialogRef = this.dialog.open(StoreShareDialogComponent, {
      data: {
        shareLink: 'http://' + this.shareLink + displayName,
        text: this.store.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
