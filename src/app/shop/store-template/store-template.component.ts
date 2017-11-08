import { Component, OnInit } from '@angular/core';

import { UserService } from  '../../shared/services/user/user.service';
import { User } from  '../../shared/services/user/user';

@Component({
  selector: 'app-store-template',
  templateUrl: './store-template.component.html',
  styleUrls: ['../../store/store.scss','../shop.scss']
})

export class StoreTemplateComponent implements OnInit {

  public categories:any = [{
    id: 0,
    name: 'All'
  }, {
    id: 0,
    name: 'Electronics'
  }, {
    id: 0,
    name: 'Home'
  }, {
    id: 0,
    name: 'Kitchen'
  }];
  public category: any = {
    id: 0,
    name : 'All'
  };
  public shareLink: string;
  public text = '';
  user: User = new User();
  product = [{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-1.jpg",
    originalPriceAmount : 55.95,
    originalPriceCurrency : "USD",
    salePriceAmount : 39.30,
    salePriceCurrency : "USD",
    title : "Skin Care and Cosmetic Ingredients Dictionary. "
  }, {
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-2.jpg",
    originalPriceAmount : 39.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.00,
    salePriceCurrency : "USD",
    title : "Mermaid Chunky Glitter Large 30g Jar COSMETIC GLITTER Festival Face Body"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-3.jpg",
    originalPriceAmount : 39.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.00,
    salePriceCurrency : "USD",
    title : "Black Markup Mirror 6 Inch 3x Magnification LED Light Two-Sided Table"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-4.jpg",
    originalPriceAmount : 49.99,
    originalPriceCurrency : "USD",
    salePriceAmount : 19.99,
    salePriceCurrency : "USD",
    title : "Eyelash Dreamer Makeup Bag, Eyelash Dreamer, Makeup Bag, Makeup, Lash "
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-5.jpg",
    originalPriceAmount : 6.00,
    originalPriceCurrency : "USD",
    salePriceAmount : 4.99,
    salePriceCurrency : "USD",
    title : "E.l.f Hydrating Face Primer, 0.47 Fluid Ounce"
  },{
    imageUrl : "https://media.xberts.com/collector/source/web/templats/01-pic-6.jpg",
    originalPriceAmount : 49.99,
    originalPriceCurrency : "USD",
    salePriceAmount : 35.99,
    salePriceCurrency : "USD",
    title : "The Best Organic Vitamin C Serum - [BIG 2-OZ Bottle] - Hyaluronic Acid, 20% C + E"
  }];
  storeName: string = 'Store Name';

  constructor(
    private userService: UserService
  ) {
    let self = this;
    self.userService.currentUser.subscribe((data) => {
      if(data) {
        self.user = data;
        self.storeName = data.store[0].name;
      }
    });
  }

  ngOnInit():void { }

}
