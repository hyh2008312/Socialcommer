import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-store-share-button-edit',
  templateUrl: './store-share-button.component.html',
  styleUrls: ['./store-share-button.component.scss']
})

export class StoreShareButtonComponent {
  @Input() public link: string;
  @Input() public text: string;
}
