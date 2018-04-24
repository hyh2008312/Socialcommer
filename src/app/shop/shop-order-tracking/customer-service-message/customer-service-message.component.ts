import {Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-customer-service-message',
  templateUrl: './customer-service-message.component.html',
  styleUrls: ['../_store-message.scss']
})

export class CustomerServiceMessageComponent implements OnInit {
  @Input() message;
  @Input() customerName = '';
  @Input() supplierName = '';

  constructor() {
  }

  ngOnInit(): void {

  }


}
