import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductItemCardComponent implements OnInit {

  @Input() product:any = {};

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
