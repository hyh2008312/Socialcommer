import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ImageUploadPreviewService } from "../image-upload-preview/image-upload-preview.service";

@Component({
  selector: 'app-image-upload-header',
  templateUrl: './image-upload-header.component.html',
  styleUrls: ['./image-upload-header.component.css']
})
export class ImageUploadHeaderComponent implements OnInit {

  @Input() previewImgFile;
  @Output() previewImgFileChange: EventEmitter<string> = new EventEmitter();

  previewImgSrcs: Object;

  upload: boolean = false;

  constructor(public previewImageService: ImageUploadPreviewService) { }

  ngOnInit() {
  }

  previewPic(event) {
    this.previewImgSrcs = {};
    this.previewImgFile = {};

    this.upload = false;

    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImageService.readAsDataUrl(event.target.files[0]).then(function(result) {

      that.previewImgSrcs = result;
      let file = event.target.files[0];

      that.previewImgFile = file;
      that.previewImgFileChange.emit(that.previewImgFile);

      that.upload = true;
    })

  }


}
