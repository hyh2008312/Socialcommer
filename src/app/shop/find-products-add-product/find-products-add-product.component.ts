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

  product: RecommendProduct = new RecommendProduct();
  originalPrice: OriginalPrice = new OriginalPrice();
  salePrice: SalePrice = new SalePrice();
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
    self.shopService.getRecommendProduct({id}).then((data) => {
      self.product = data;
      self.originalPrice = data.originalPrice;
      self.salePrice = data.salePrice;
      self.image.push(data.cover);
      self.selectedImage = data.cover;
      self.imageSources.push(data.cover);

      let feature = '';
      if(data.features) {
        for(let value of data.features) {
          feature += `<p>${value}</p><br>`;
        }
        self.description = `<div>${feature}</div>`;
      }
    });
  }

  close():void {
    this.router.navigate(['/shop/listings/items']);
  }

  addEdit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.router.navigate([`/shop/listings/items/${id}/preview`]);
  }

}
