import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-order-list-title',
  templateUrl: './order-list-title.component.html',
  styleUrls: ['../_order-tracking.scss']
})

export class OrderListTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
