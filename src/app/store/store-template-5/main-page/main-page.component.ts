import {Component, OnInit, OnDestroy} from '@angular/core';
import {StoreService} from '../../store.service';

@Component({
  selector: 'app-shop-template-5',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-5.scss']
})

export class MainPageComponent implements OnInit {
  storeName: string = '';
  text: string = '';
  categories: any;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    let self = this;
    self.storeService.store.subscribe((data) => {
      if (data) {
        self.storeName = data.context ? data.context.nameTag : data.name;
        self.text = data.description;
        self.categories = data.category;
      }
    });
  }

  ngOnDestroy() {
  }
}
