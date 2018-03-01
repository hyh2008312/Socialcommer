import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-store-template-1-return',
  templateUrl: './return-policy.component.html',
  styleUrls: ['./_return-policy.scss']
})

export class ReturnPolicyComponent implements OnInit {

  public shareLink: string;
  public text = '';

  contextList: any = {};
  imageList: any = {};

  store: Store = new Store();
  page = 1;
  nextPage: boolean = true;
  product: any = [];

  productNumber: number = 0;
  displayName: string;

  ownerFirstName: string;
  ownerLastName: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private media: ObservableMedia) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.displayName = data.displayName;
        self.ownerFirstName = data.ownerFirstName;
        self.ownerLastName = data.ownerLastName;
        self.contextList = data.context ? data.context : {};
        self.text = data.description;
        self.storeService.addTitleDescription({
          title: data.name,
          description: data.description,
          shareImage: data.imageUrl
        });

        self.storeService.pageView({
          pageType: 'store',
          viewTime: new Date().getTime(),
          storeId: data.id
        });

      }
    });

    self.storeService.cart.subscribe((data) => {
      if (data && data.length > 0) {
        self.productNumber = 0;
        for (let item of data) {
          self.productNumber += parseInt(item.number);
        }
      }
    });
  }

  ngOnDestroy() {
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

  jumpAbout(): void {
    this.router.navigate([`./store/${this.displayName}/1/about`]);
  }

  jumpPrivacy(): void {
    this.router.navigate([`./store/${this.displayName}/1/privacy`]);
  }

  jumpReturn(): void {
    this.router.navigate([`./store/${this.displayName}/1/return`]);
  }

  jumpFaq(): void {
    this.router.navigate([`./store/${this.displayName}/1/faq`]);
  }

  jumpStore(): void {
    this.router.navigate([`./store/${this.displayName}/1`]);
  }

}
