import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-title',
  templateUrl: './product-title.component.html',
  styleUrls: ['../_shop.scss']
})

export class ProductTitleComponent implements OnInit {

  @Input() status: any = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }



}
