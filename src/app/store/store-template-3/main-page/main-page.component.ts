import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-template-3',
  templateUrl: './main-page.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class MainPageComponent implements OnInit {

  storeName: string = '';
  isDialogOpen: boolean = false;
  text: string = '';
  displayName='' ;
  productNumber: number = 0;

  constructor(
    private router : Router,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    let self = this;

    self.storeService.store.subscribe((data) => {
      if(data) {
        self.storeService.addCart(self.storeService.getProductInCart(data.displayName));
        self.storeName = data.context? data.context.nameTag: data.name;
        self.text = data.description;
        this.displayName = data.displayName;
      }
    });
    self.storeService.cart.subscribe((data) => {
      if(data && data.length>0) {
        self.productNumber = 0;
        for(let item of data) {
          self.productNumber += parseInt(item.number);
        }
      }
    });
  }

  ngOnDestroy() {

  }

  openDialog(event?:any) {
    if(event) {
      return this.isDialogOpen = false;
    }
    this.isDialogOpen = !this.isDialogOpen;
  }

  jumpCart(): void {
    this.router.navigate([`./store/${this.displayName}/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`./store/${this.displayName}/order`]);
  }

}
