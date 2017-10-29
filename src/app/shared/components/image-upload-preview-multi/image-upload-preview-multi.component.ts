import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ImageUploadPreviewService } from "../image-upload-preview/image-upload-preview.service";
import { S3UploaderService } from "../../services/s3-upload/s3-upload.service";

@Component({
  selector: 'app-image-upload-preview-multi',
  templateUrl: './image-upload-preview-multi.component.html',
  styleUrls: ['../image-upload-preview/image-upload-preview.component.css'],
  providers: [S3UploaderService]
})
export class ImageUploadPreviewMultiComponent implements OnInit {

  @Input() previewImgFile: any[] = [];
  @Output() previewImgFileChange: EventEmitter<any[]> = new EventEmitter();

  @Input() previewImgSrcs: any[] = [];

  upload: boolean = false;

  constructor(
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService
  ) {

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
          let id = data.id;
          that.s3UploaderService.uploadToS3(file, data).then((data) => {
            that.previewImgFile.push(id);
            that.previewImgFileChange.emit(that.previewImgFile);
          });
        });
      };
      image.src = window.URL.createObjectURL(file);

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
