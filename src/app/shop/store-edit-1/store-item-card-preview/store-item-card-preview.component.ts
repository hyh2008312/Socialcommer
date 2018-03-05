import { Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-store-item-card-preview',
  templateUrl: './store-item-card-preview.component.html',
  styleUrls: ['../../../store/store.scss', '../../shop.css']
})

export class StoreItemCardPreviewComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any = null;

  currency = 'USD';

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
