import {Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-orders-title',
  templateUrl: './orders-title.component.html',
  styleUrls: ['../_orders.scss']
})

export class OrdersTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor() {
  }

  ngOnInit(): void {

  }


}
