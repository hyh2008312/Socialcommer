import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-store-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store.scss']
})

export class StoreNavigationComponent implements OnInit {

  @Input() category : string;
  @Input() categories = [];

  @Output() categoryChange = new EventEmitter<string>();

  constructor(

  ) { }

  ngOnInit(): void {

  }

  changeCategory(category: string) {
    this.category = category;
    this.categoryChange.emit(this.category);
  }


}
