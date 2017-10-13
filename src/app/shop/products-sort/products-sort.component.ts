import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-products-sort',
  templateUrl: './products-sort.component.html',
  styleUrls: ['../shop.scss']
})

export class ProductsSortComponent implements OnInit {

  @Input() sorts: [string];
  @Input() selectedSort: string;
  @Output() selectedSortChange = new EventEmitter();

  constructor(

  ) { }

  ngOnInit(): void {

  }

  onChange() {
    this.selectedSortChange.emit(this.selectedSort);
  }

}
