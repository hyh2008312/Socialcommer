import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-shop-share-5-button',
  templateUrl: './store-share-button.component.html',
  styleUrls: ['./_store-share-button.component.scss']
})

export class StoreShareButtonComponent {
  @Input() public link: string;
  @Input() public text: string;
}
