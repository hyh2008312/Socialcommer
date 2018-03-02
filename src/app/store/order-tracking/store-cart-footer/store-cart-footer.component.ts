import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-cart-footer',
  templateUrl: './store-cart-footer.component.html',
  styleUrls: ['./_store-cart-footer.scss']
})

export class StoreCartFooterComponent{

  @Input() storeName: string;
  @Input() text: string;
  @Input() contactUsTag: string;
  shareLink: string;
  displayName: string;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
  }

  jumpAbout(): void {
    this.router.navigate([`./store/${this.displayName}/5/about`]);
  }

  jumpPrivacy(): void {
    this.router.navigate([`./store/${this.displayName}/5/privacy`]);
  }

  jumpReturn(): void {
    this.router.navigate([`./store/${this.displayName}/5/return`]);
  }

  jumpFaq(): void {
    this.router.navigate([`./store/${this.displayName}/5/faq`]);
  }
}
