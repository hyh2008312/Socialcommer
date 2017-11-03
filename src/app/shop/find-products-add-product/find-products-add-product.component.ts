import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ShopService } from '../shop.service';
import { RecommendProduct, Image } from '../shop';

@Component({
  selector: 'app-find-products-add-product',
  templateUrl: './find-products-add-product.component.html',
  styleUrls: ['../../store/store.scss']
})

export class FindProductsAddProductComponent implements OnInit {

  product: RecommendProduct = new RecommendProduct();
  image: any;
  selectedImage: Image = new Image();
  imageSources: string[] = [];

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
      self.image = data.imageUrl;
      if(data.imageUrl.length > 0) {
        self.selectedImage = data.imageUrl[0];
        for(let value of data.imageUrl) {
          self.imageSources.push(value.url);
        }
      }
    });
  }

  close():void {
    this.router.navigate(['/shop/products']);
  }

  addEdit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.router.navigate([`/shop/products/${id}/preview`]);
  }

}
