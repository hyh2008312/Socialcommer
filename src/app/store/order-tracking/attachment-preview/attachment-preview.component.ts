import {Component, EventEmitter, Input, OnInit, Output,OnChanges} from '@angular/core';
import { ImageUploadPreviewService } from "../../../shared/components/image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../../shared/services/s3-upload/s3-upload.service";

import { HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-order-attachment-preview',
  templateUrl: './attachment-preview.component.html',
  styleUrls: ['./_attachment-preview.component.scss']
})
export class AttachmentPreviewComponent implements OnInit {

  @Input() previewImgSrcs: any = null;

  upload: boolean = false;

  constructor(
    public previewImageService: ImageUploadPreviewService,
    private s3UploaderService: S3UploaderService
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
