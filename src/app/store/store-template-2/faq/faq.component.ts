import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {Store} from '../../store';

@Component({
  selector: 'app-store-template-2-faq-me',
  templateUrl: './faq.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class FaqComponent implements OnInit {
  store: Store = new Store();
  contextList: any = {};
  imageList: any = {};
  ownerId: any;
  text: string;
  productNumber: number = 0;
  displayName: string;
  questionNumber: number = 1;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }

  ngOnInit(): void {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if (data) {
        self.store = data;
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.contextList = data.context ? data.context : {};
        self.imageList = data.images ? data.images : {};
        self.text = data.description;
        self.displayName = data.displayName ;
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

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }
  changeQuestionNumber(num: number): void {
    this.questionNumber = num;
  }
}
