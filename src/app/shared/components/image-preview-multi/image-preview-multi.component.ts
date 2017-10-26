import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-image-preview-multi',
  templateUrl: './image-preview-multi.component.html',
  styleUrls: ['../image-upload-preview/image-upload-preview.component.css']
})
export class ImagePreviewMultiComponent {

  @Input() previewImg: any[] = [];

  constructor() {

  }

}
