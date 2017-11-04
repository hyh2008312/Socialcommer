import {Component, EventEmitter, Input, OnInit, Output,OnChanges} from '@angular/core';
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
  @Input() previewImgSrcs: any = null;
  @Input() larger : any = false;

  upload: boolean = false;

  constructor(
    public previewImageService: ImageUploadPreviewService,
    public s3UploaderService: S3UploaderService
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.previewImgSrcs) {
      this.upload = true;
    }
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
          that.previewImgFile = data.url + '/' + data.key;
          that.s3UploaderService.uploadToS3(file, data).then((data) => {
            that.previewImgFileChange.emit(that.previewImgFile);
          });
        });
      };
      image.src = window.URL.createObjectURL(file);

      that.upload = true;
    })

  }


}
