import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-item-card',
  templateUrl: './product-item-card.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductItemCardComponent implements OnInit {

  @Input() product:any = {};

  currency: string = 'USD';

  constructor(
  ) { }

  ngOnInit(): void {

  }

  getLowestPrice(variants): any {
    let price: any = {
      saleUnitPrice : variants[0],
      unitPrice : variants[0]
    };

    let unitPriceArray = [];

    for(let i=0;i<variants.length;i++){
      if(variants[i].saleUnitPrice <=  price.saleUnitPrice){
        price.saleUnitPrice = variants[i].saleUnitPrice;
      }
    }

    for(let value of variants) {
      if(value.saleUnitPrice == price.saleUnitPrice) {
        unitPriceArray.push(value.unitPrice);
      }
    }

    for(let value of unitPriceArray) {
      if(value <=  price.unitPrice){
        price.unitPrice = value;
      }
    }

    return price;
  }

}
