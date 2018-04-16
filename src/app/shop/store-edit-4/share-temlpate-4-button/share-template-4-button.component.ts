import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-share-template-4-button',
  templateUrl: './share-template-4-button.component.html',
  styleUrls: ['./_share-button.component.scss']
})

export class ShareTemplate4ButtonComponent {
  @Input() public link: string;
  @Input() public text: string;
  @Input() public style: any;


}
