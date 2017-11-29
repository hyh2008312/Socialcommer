import { Input, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class StoreItemCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  jumpLink() {

  }

}
