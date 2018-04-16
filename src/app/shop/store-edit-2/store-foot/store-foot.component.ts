import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-store-template-edit-2-store-foot',
  templateUrl: './store-foot.component.html',
  styleUrls: ['./_store-foot.scss']
})

export class StoreFootComponent implements OnInit {
  @Input() storeName: string;
  public shareLink: string;
  public text:string;

  constructor() {
  }

  ngOnInit(): void {
    this.shareLink = window.location.href;

  }
}
