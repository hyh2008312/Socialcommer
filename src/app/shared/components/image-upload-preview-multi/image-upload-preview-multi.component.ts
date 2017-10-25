import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ImageUploadPreviewService } from "../image-upload-preview/image-upload-preview.service";


@Component({
  selector: 'app-image-upload-preview-multi',
  templateUrl: './image-upload-preview-multi.component.html',
  styleUrls: ['../image-upload-preview/image-upload-preview.component.css']
})
export class ImageUploadPreviewMultiComponent implements OnInit {

  @Input() previewImgFile: any[] = [];
  @Output() previewImgFileChange: EventEmitter<any[]> = new EventEmitter();

  previewImgSrcs: any[] = [];

  upload: boolean = false;

  constructor(public previewImageService: ImageUploadPreviewService) {

  }

  ngOnInit() {
  }

  previewPic(event) {
    if(!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewImageService.readAsDataUrl(event.target.files[0]).then(function(result) {

      that.previewImgSrcs.push(result);
      let file = event.target.files[0];

      that.previewImgFile.push(file);
      that.previewImgFileChange.emit(that.previewImgFile);

      if( that.previewImgSrcs.length >= 5) {
        that.upload = true;
      }
    })

  }

  remove(i) {
    this.previewImgSrcs.splice(i,1);
    this.previewImgFile.splice(i,1);

    this.upload = false;
  }


}
