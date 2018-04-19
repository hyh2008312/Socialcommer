import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-store-template-2-store-foot',
  templateUrl: './store-foot.component.html',
  styleUrls: ['./_store-foot.scss']
})

export class StoreFootComponent implements OnInit ,OnChanges{
  @Input() storeName: string;
  @Input() displayName: string;
  public shareLink: string;
  @Input() text: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    let baseUrl = window.location.href.split("/store/");
    this.shareLink = `${baseUrl[0]}/store/${this.displayName}/2`;
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
