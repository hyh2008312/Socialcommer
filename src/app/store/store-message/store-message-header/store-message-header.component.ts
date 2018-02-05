import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-message-header',
  templateUrl: './store-message-header.component.html',
  styleUrls: ['../_store-message.scss']
})

export class StoreMessageHeaderComponent{

  @Input() homeLink: string = '';
  @Input() cartLink: string = '';

  constructor(

  ) {

  }


}
