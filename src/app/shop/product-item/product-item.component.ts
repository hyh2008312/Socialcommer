import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
