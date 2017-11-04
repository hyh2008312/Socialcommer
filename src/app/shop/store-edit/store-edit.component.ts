import { Component, OnInit } from '@angular/core';

import { UserService } from  '../../shared/services/user/user.service';
import { User } from  '../../shared/services/user/user';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['../../store/store.scss','../shop.scss']
})

export class StoreEditComponent implements OnInit {

  public categories:any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Electronics'
  }, {
    id: 0,
    name: 'Home'
  }, {
    id: 0,
    name: 'Kitchen'
  }];
  public category: any = {
    id: 0,
    name : 'All'
  };
  public shareLink: string;
  public text = '';
  user: User = new User();
  product = [{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-1.jpg",
    originalPriceAmount : 55.95,
    originalPriceCurrency : "USD",
    salePriceAmount : 39.30,
    salePriceCurrency : "USD",
    title : "Skin Care and Cosmetic Ingredients Dictionary. "
  }, {
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-2.jpg",
    originalPriceAmount : 39.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.00,
    salePriceCurrency : "USD",
    title : "Mermaid Chunky Glitter Large 30g Jar COSMETIC GLITTER Festival Face Body"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-3.jpg",
    originalPriceAmount : 39.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.00,
    salePriceCurrency : "USD",
    title : "Black Markup Mirror 6 Inch 3x Magnification LED Light Two-Sided Table"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-4.jpg",
    originalPriceAmount : 49.99,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.99,
    salePriceCurrency : "USD",
    title : "Eyelash Dreamer Makeup Bag, Eyelash Dreamer, Makeup Bag, Makeup, Lash "
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-5.jpg",
    originalPriceAmount : 6.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 4.99,
    salePriceCurrency : "USD",
    title : "E.l.f Hydrating Face Primer, 0.47 Fluid Ounce"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-6.jpg",
    originalPriceAmount : 49.99,
    originalPriceCurrency : "USD",
    salePriceAmount : 35.99,
    salePriceCurrency : "USD",
    title : "The Best Organic Vitamin C Serum - [BIG 2-OZ Bottle] - Hyaluronic Acid, 20% C + E"
  }];

  public editorConfig = {
    theme: 'bubble',
    modules: {
      toolbar: [
        ['bold', 'italic'],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link'],
        ['clean']
      ]
    }
  };

  editorContent = '';

  previewImgFile: any = null;
  previewImgSrcs: any = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      if(data) {
        self.user = data;
        self.previewImgFile = data.avatar;
        self.previewImgSrcs = data.avatar;
      }
    });

    this.storeForm = this.fb.group({
      nameTag: [this.nameTag],
      titleTag: [this.titleTag],
      descriptionTag: [this.descriptionTag],
      userTag: [this.userTag],
      name: [],
      country: []
    });
  }

  ngOnInit():void {

  }

  storeForm: FormGroup;

  nameTag = 'Store name';
  titleTag = 'Click here to edit the title';
  descriptionTag = 'This is your starter site, a single page online storefront. All of the images and text on this page can be changed to personalize the site for brand and to communicate your unique story to your customers.';
  userTag = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business. Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training that make you an expert in your field? Show your customers that there are real people with interesting stories working behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust in your brand.';
  imageSrc = 'https://media.xberts.com/collector/source/web/templats/01-pic-7.jpg';

  nameEdited: boolean = false;
  titleEdited: boolean = false;
  descriptionEdited: boolean = false;
  userEdited: boolean = false;
  userNameEdited: boolean = false;
  imageEdited: boolean = false;
  avatarEdited: boolean = false;

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

  editImage() {
    this.imageEdited = !this.imageEdited;
  }

  imageChange() {
    console.log(this.imageSrc);
  }

  editAvatar() {
    this.avatarEdited = !this.avatarEdited;
  }
}
