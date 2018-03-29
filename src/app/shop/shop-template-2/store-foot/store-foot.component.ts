import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-shop-template-2-store-foot',
  templateUrl: './store-foot.component.html',
  styleUrls: ['./store-foot.scss']
})

export class StoreFootComponent implements OnInit {
  @Input() storeName: string = 'Store Name';
  public shareLink: string;
  public text:string;

  constructor() {
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }
}
