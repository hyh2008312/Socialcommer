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

  constructor(

  ) { }

  ngOnInit(): void {

  }

  changeCategory(category: any) {
    this.category = category;
    this.categoryChange.emit(this.category);
  }
}
