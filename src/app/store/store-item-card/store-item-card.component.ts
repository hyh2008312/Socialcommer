import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-store-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['../../shop/shop.css','../store.scss']
})

export class StoreItemCardComponent implements OnInit {

  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
