import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { StoreService } from '../store.service';
import { Store, Product, Image } from '../store';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['../store.scss']
})

export class StoreDetailComponent implements OnInit {

  public shareLink: string;
  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
    + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
    + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
    + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';
  store: Store = new Store();
  product: Product = new Product();
  image: any;
  selectedImage: Image = new Image();
  imageSources: string[] = [];

  constructor(
    public router: Router,
    private activatedRouter: ActivatedRoute,
    private storeService: StoreService
  ) {
    let self = this;
    this.storeService.store.subscribe((data) => {
      if(data) {
        self.store = data;
      }
    });
  }

  ngOnInit():void {
    this.shareLink = window.location.href;

    let id = this.activatedRouter.snapshot.params['id'];
    let self = this;
    this.storeService.getProduct(id).then((data) => {
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
    this.router.navigate([`./store/${this.store.displayName}`]);
  }

}
