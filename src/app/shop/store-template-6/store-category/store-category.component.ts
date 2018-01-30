import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-shop-template-6-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreCategoryComponent implements OnInit {

  @Input() category: any = {
    id: null,
    name: ''
  };
  @Input() categories: any[] = [];

  @Output() categoryChange = new EventEmitter<string>();

  features: any = [
    {id: 1, name: 'Best Seller'},
    {id: 2, name: 'Discount'},
    {id: 3, name: 'Latest Products'},
    {id: 4, name: 'On sale'}
  ];
  feature = this.features[0];

  constructor() {
  }

  ngOnInit(): void {
  }

  changeCategory(category: any) {
    this.category = category;
    this.categoryChange.emit(this.category);
  }

  changeFeature(feature: any) {
    this.feature = feature;
    // this.categoryChange.emit(this.category);
  }


}
