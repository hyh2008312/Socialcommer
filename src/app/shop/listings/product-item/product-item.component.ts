import { Input, Output, Component, OnInit,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ShopService } from '../shop.service';
import { UserService } from  '../../../shared/services/user/user.service';

import { ProductShareDialogComponent } from "../product-share-dialog/product-share-dialog.component";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['../_shop.scss']
})

export class ProductItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;
  @Input() index: number = 0;
  @Output() productChange = new EventEmitter<any>();

  storeId;
  storeCurrency = 'USD';
  displayName = '';
  templateId = 5;

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let self = this;
    self.userService.store.subscribe((data) => {
      if(data) {
        self.storeId = data.id;
        self.storeCurrency = data.currency.toUpperCase();
        self.displayName = data.displayName;
        self.templateId = data.template?data.template.templateId:5;
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

    let product = {
      id: this.product.id,
      status: 'published'
    };

    self.shopService.publishProduct(product).then((data) => {
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

    let product = {
      id: this.product.id,
      status: 'unpublished'
    };

    self.shopService.publishProduct(product).then((data) => {
      self.productChange.emit({
        product: self.product,
        event: 'unpublish',
        status: self.status,
        index: self.index
      })
    });
  }

  promote() {
    let dialogRef = this.dialog.open(ProductShareDialogComponent, {
      data: {
        shareLink: `http://${window.location.host}/store/${this.displayName}/${this.templateId}/detail/${this.product.id}`,
        text: this.product.title
      }
    });

    dialogRef.afterClosed().subscribe(result => {

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
