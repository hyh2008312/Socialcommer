import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-shop-template-4-store-foot',
  templateUrl: './store-foot.component.html',
  styleUrls: ['./_store-foot.scss']
})

export class StoreFootComponent implements OnInit {
  @Input() storeName: string;
  @Input() displayName: string;
  @Input() text: string;
  public shareLink: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
  }

  jumpAbout(): void {
    this.router.navigate([`./store/${this.displayName}/4/about`]);
  }

  jumpPrivacy(): void {
    this.router.navigate([`./store/${this.displayName}/4/privacy`]);
  }

  jumpReturn(): void {
    this.router.navigate([`./store/${this.displayName}/4/return`]);
  }

  jumpFaq(): void {
    this.router.navigate([`./store/${this.displayName}/4/faq`]);
  }
}
