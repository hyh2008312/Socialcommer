import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ImageUploadPreviewService } from "./image-upload-preview.service";

@Component({
  selector: 'app-image-upload-preview',
  templateUrl: './image-upload-preview.component.html',
  styleUrls: ['./image-upload-preview.component.css']
})
export class ImageUploadPreviewComponent implements OnInit {

  @Input() previewImgFile;
  @Output() previewImgFileChange: EventEmitter<string> = new EventEmitter();

  previewImgSrcs: Object;

  upload: boolean = false;

  constructor(public previewImageService: ImageUploadPreviewService) { }

  ngOnInit() {
  }

  previewPic(event) {
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
  remove(i) {
    this.previewImgSrcs = {};
    this.previewImgFile = {};

    this.upload = false;
  }
}
