import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';
import { Store } from '../../store';

@Component({
  selector: 'app-store-template-3-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class FaqComponent implements OnInit {
  store: Store = new Store();
  public shareLink: string;
  public text = '';
  contextList: any = {};
  imageList: any = {};
  questionNumber: number = 1;
//退换货的天数
  returnDays: string = '30';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if(data) {
        self.store = data;
        let countryCode = data.country.code;
        if (countryCode == 'US') {
          self.returnDays = '30';
        } else if (countryCode == 'IN') {
          self.returnDays = '10';
        }
        self.contextList = data.context?data.context: {};
        self.imageList = data.images? data.images: {};
        self.text = data.description;
      }
    });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;
  }
  changeQuestionNumber(num: number): void {
    this.questionNumber = num;
  }

}
