import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-cart-footer',
  templateUrl: './store-cart-footer.component.html',
  styleUrls: ['./_store-cart-footer.scss']
})

export class StoreCartFooterComponent{

  @Input() text: string;
  @Input() contactUsTag: string = '';
  shareLink: string;
  displayName: string;

  uid: any = 1;

  constructor(
    private router: Router,
    private storeService: StoreService
  ) {
    this.storeService.store.subscribe((data) => {
      if(data) {
        this.uid = data.templateId;
        this.displayName = data.displayName;
        this.homeLink = `/store/${this.displayName}/${this.uid}`;
      }
    });
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
  }

  jumpAbout(): void {
    this.router.navigate([`./store/${this.displayName}/${this.uid}/about`]);
  }

  jumpPrivacy(): void {
    this.router.navigate([`./store/${this.displayName}/${this.uid}/privacy`]);
  }

  jumpReturn(): void {
    this.router.navigate([`./store/${this.displayName}/${this.uid}/return`]);
  }

  jumpFaq(): void {
    this.router.navigate([`./store/${this.displayName}/${this.uid}/faq`]);
  }
}
