import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-share-template-5-button',
  templateUrl: './share-template-5-button.component.html',
  styleUrls: ['./_share-button.component.scss']
})

export class ShareTemplate5ButtonComponent {
  @Input() public link: string;
  @Input() public text: string;
  @Input() public style: any;


}
