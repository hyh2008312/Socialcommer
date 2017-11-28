import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-template-3-store-footer',
  templateUrl: './store-footer.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreFooterComponent implements OnInit{

  link: string;
  @Input() text = '';
  @Input() name = '';

  constructor(
  ) {

  }

  ngOnInit() {
    this.link = window.location.href;
  }

}
