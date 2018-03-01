import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-store-template-2-store-foot',
  templateUrl: './store-foot.component.html',
  styleUrls: ['./store-foot.scss']
})

export class StoreFootComponent implements OnInit {
  @Input() storeName: string;
  @Input() displayName: string;
  public shareLink: string;
  @Input() text: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;
  }
  jumpAbout(): void {
    this.router.navigate([`./store/${this.displayName}/2/about`]);
  }

  jumpPrivacy(): void {
    this.router.navigate([`./store/${this.displayName}/2/privacy`]);
  }

  jumpReturn(): void {
    this.router.navigate([`./store/${this.displayName}/2/return`]);
  }

  jumpFaq(): void {
    this.router.navigate([`./store/${this.displayName}/2/faq`]);
  }


}
