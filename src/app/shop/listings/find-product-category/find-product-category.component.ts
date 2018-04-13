import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-shop-find-product-category',
  templateUrl: './find-product-category.component.html',
  styleUrls: ['./_find-product-category.scss']
})

export class FindProductCategoryComponent implements OnInit {

  @Input() category : any = {
    id: null,
    name: ''
  };
  @Input() categories: any[] = [];

  @Output() categoryChange = new EventEmitter<string>();

  hideCategoryList: any = ["Men’s Fashion", "Toys & Games", "Pet Supplies"];

  constructor(

  ) { }

  ngOnInit(): void {

  }

  changeCategory(category: any) {
    this.category = category;
    this.categoryChange.emit(this.category);
  }

  hideCategory(item) {
    for(let value of this.hideCategoryList) {
      if(item.data.name == value){
        return false;
      }
    }
    return true;
  }
}
