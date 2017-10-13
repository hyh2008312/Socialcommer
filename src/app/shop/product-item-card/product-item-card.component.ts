import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductItemCardComponent implements OnInit {

  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
