import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ShopService } from '../shop.service';
import { RecommendProduct, Image, OriginalPrice, SalePrice} from '../shop';

@Component({
  selector: 'app-find-products-add-product',
  templateUrl: './find-products-add-product.component.html',
  styleUrls: ['../../store/store.scss']
})

export class FindProductsAddProductComponent implements OnInit {

  product: any;
  category: any;
  originalPrice: any;
  salePrice: any;
  currency: string = 'USD';
  image: any = [];
  selectedImage: any = '';
  imageSources: string[] = [];
  description: any = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService
  ) {

  }

  ngOnInit():void {

    let id = this.activatedRoute.snapshot.params['id'];

    let self = this;
    self.shopService.getSupplyProductDetail({id}).then((data) => {
      self.product = data;
      self.category = data.categories[0].name;
      self.originalPrice = self.getLowestPrice(data.variants).unitPrice;
      self.salePrice =  self.getLowestPrice(data.variants).saleUnitPrice;
      self.image.push(data.mainImage);
      self.selectedImage = data.mainImage;
      self.imageSources.push(data.mainImage);

      self.description = data.description;
    });
  }

  close():void {
    this.router.navigate(['/shop/listings/items']);
  }

  addEdit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.router.navigate([`/shop/listings/items/${id}/preview`]);
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
