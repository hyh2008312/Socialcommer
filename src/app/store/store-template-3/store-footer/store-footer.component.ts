import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-store-template-3-store-footer',
  templateUrl: './store-footer.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreFooterComponent implements OnInit {

  link: string;
  @Input() text = '';
  @Input() name = '';
  @Input() displayName: string;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.link = window.location.href;
  }

  jumpAbout(): void {
    this.router.navigate([`./store/${this.displayName}/3/about`]);
  }

  jumpPrivacy(): void {
    this.router.navigate([`./store/${this.displayName}/3/privacy`]);
  }

  jumpReturn(): void {
    this.router.navigate([`./store/${this.displayName}/3/return`]);
  }

  jumpFaq(): void {
    this.router.navigate([`./store/${this.displayName}/3/faq`]);
  }

}
