import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-shop-template-5-store-foot',
  templateUrl: './store-foot.component.html',
  styleUrls: ['./store-foot.scss']
})

export class StoreFootComponent implements OnInit {
  @Input() storeName: string;
  @Input() text: string;
  public shareLink: string;

  constructor() {
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }
}
