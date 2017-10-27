import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit(): void {

  }

  delete() {
    let self = this;

    self.shopService.deleteProduct(this.product).then((data) => {
      self.productChange.emit({
        product: self.product,
        event: 'delete',
        status: self.status,
        index: self.index
      })
    });
  }

  edit() {

  }
}
