import {Component, EventEmitter, Input, OnInit, Output,OnChanges} from '@angular/core';
import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";

@Component({
  selector: 'app-shop-attachment-preview',
  templateUrl: './attachment-preview.component.html',
  styleUrls: ['./_attachment-preview.component.scss']
})
export class AttachmentPreviewComponent implements OnInit {

  @Input() previewImgSrcs: any = null;

  upload: boolean = false;

  constructor(
    public previewImageService: ImageUploadPreviewService
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.previewImgSrcs) {
      this.upload = true;
    }
  }

}
