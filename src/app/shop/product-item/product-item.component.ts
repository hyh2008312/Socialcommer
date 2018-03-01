import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';

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

  storeId;
  storeCurrency = 'USD';

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let self = this;
    self.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;
        self.storeCurrency = data.currency.toUpperCase();
      }
    });
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

  publish() {
    let self = this;

    self.shopService.publishProduct(this.product).then((data) => {
      self.productChange.emit({
        product: data,
        event: 'publish',
        status: self.status,
        index: self.index
      })
    });
  }

  unpublish() {
    let self = this;

    self.shopService.publishProduct(this.product).then((data) => {
      self.productChange.emit({
        product: self.product,
        event: 'unpublish',
        status: self.status,
        index: self.index
      })
    });
  }

  edit() {
    let tab = '';
    switch (this.status) {
      case 0:
        tab = 'publish';
        break;
      case 1:
        tab = 'unpublish';
        break;
    }
    this.router.navigate([`shop/listings/products/${this.product.id}/edit`], {queryParams: {tab}});
  }
}
