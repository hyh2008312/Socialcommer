import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ImageUploadPreviewService } from "../image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../services/s3-upload/s3-upload.service";

@Component({
  selector: 'app-image-upload-header',
  templateUrl: './image-upload-header.component.html',
  styleUrls: ['./image-upload-header.component.css'],
  providers: [S3UploaderService]
})
export class ImageUploadHeaderComponent implements OnInit {

  @Input() previewImgFile;
  @Output() previewImgFileChange: EventEmitter<string> = new EventEmitter();

  previewImgSrcs: Object;

  upload: boolean = false;

  constructor(
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService
  ) {

  }

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

    this.previewImageService.readAsDataUrl(event.target.files[0]).then((result) => {

      that.previewImgSrcs = result;
      let file = event.target.files[0];

      let image = new Image();
      image.onload = function(){
        let width = image.width;
        let height = image.height;

        that.s3UploaderService.upload({
          type: 'COLLECTOR_USER_AVATAR',
          fileName: file.name,
          use: 'avatar',
          width: width,
          height: height
        }).then((data)=> {
          that.s3UploaderService.uploadToS3(
            {type: 'COLLECTOR_USER_AVATAR', fileName: file.name},
            data
          ).then((data) => {
            console.log(data)
          });
        });
      };
      image.src = window.URL.createObjectURL(file);

      that.previewImgFile = file;
      that.previewImgFileChange.emit(that.previewImgFile);

      that.upload = true;
    })

  }


}
