import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-store-template-3-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class StoreCategoryComponent implements OnInit {

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
