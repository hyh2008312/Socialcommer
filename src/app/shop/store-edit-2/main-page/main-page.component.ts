import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../shared/services/user/user.service';
import {ShopService} from '../../shop.service';
import {MatDialog} from '@angular/material';
import {Store} from '../../shop';

@Component({
  selector: 'app-store-template-edit-2',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-2-edit.scss']
})

export class MainPageComponent implements OnInit {
  imageHomeMade: string = 'https://media.socialcommer.com/source/web/pic/pic-2-5.jpg';

  shareLink: string;

  viewIndex: number;
  //定义字段
  nameTag = 'STORE NAME';

  titleTag = '<div >Click here to edit the title</div>';

  descriptionTag = '<div>This was founded with starter site, a single page ' +
    'online storefront. All of the images and text on this page can be changed to personalize the site for brand ' +
    'and to communicate your unique story to your customers.</div>';

  aboutMeTag = '<div> Here you let your customers get to know you. Tell them a little bit about ' +
    'yourself and why you create this business. Show your customers that there are real people with ' +
    'interesting stories working behind the scenes.</div>';

  aboutMeOneImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-2.jpg';
  aboutMeTwoImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-3.jpg';
  aboutMeCover = 'https://media.socialcommer.com/source/web/template/3/02-pic.jpg';

  homeMadeDesTag = '<div> Do you have a passion, hobby or life experience that inspired you to get started?' +
    ' Do you have special skills that make you an expert in your field?  ' +
    'Helping customers feel connected to you and your purpose will' +
    ' inspire more trust in your brand.</div>';

  homeMadeOneImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-4.jpg';
  homeMadeTwoImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-6.jpg';

  bannerImageStr = 'https://media.socialcommer.com/source/web/pic/pic-2-1.jpg';

  uploadAboutType = 'COLLECTOR_STORE_TEMPLATE';


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
  homeMadeDesEdited: boolean = false;
  imageEdited: boolean = false;

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

  editHomeMadeDes() {
    this.homeMadeDesEdited = !this.homeMadeDesEdited;
  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private fb: FormBuilder,
              private userService: UserService,
              private shopService: ShopService,
              private dialog: MatDialog) {
    this.viewIndex = 0;

    let self = this;
    self.storeTemplateForm = self.fb.group({
      nameTag: [self.nameTag],
      titleTag: [self.titleTag],
      descriptionTag: [self.descriptionTag],
      aboutMeTag: [self.aboutMeTag],
      homeMadeDesTag: [self.homeMadeDesTag]
    });


  }

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
            if (!firstLoad) {
              firstLoad = true;

              /*self.storeForm.setValue({
                name: self.store.name,
                description : self.store.description,
                displayName: self.store.displayName
              });*/

              self.shopService.getFrontStore(self.store.displayName).then((data) => {
                self.ownerId = data.ownerId;
                if (data.category.length > 1) {
                  self.categories = [{name: 'All'}, ...data.category];
                } else {
                  self.categories = [...data.category];
                }
                self.category = self.categories[0];
                console.log(JSON.stringify(this.category));
                console.log('-------->' + '22222')
                self.queryProduct();
              });

              for (let value of self.templateList) {
                if (value.uid == 2) {
                  self.templateId = value.id;
                  /*self.nameTag = value.context.nameTag != ''? value.context.nameTag : self.nameTag;
                  self.titleTag = value.context.titleTag != ''? value.context.titleTag : self.titleTag;
                  self.descriptionTag = value.context.descriptionTag != ''? value.context.descriptionTag : self.descriptionTag;
                  self.userTag = value.context.userTag != ''? value.context.userTag : self.userTag;

                  self.imageSrc = value.image.imageSrc;
                  self.aboutMeSrc = value.image.aboutMeSrc;*/
                  break;
                }
              }

            }
          }
        })
      }
    })

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

  ngOnDestroy() {

  }


  changeViewIndex(index): void {
    this.viewIndex = index;
  }

  jumpProductList(): void {
    this.viewIndex = 1;
  }

}
