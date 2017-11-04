import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ImageUploadPreviewService } from "./image-upload-preview.service";
import { AngularCropperjsComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-image-upload-preview',
  templateUrl: './image-upload-preview.component.html',
  styleUrls: ['./image-upload-preview.component.css']
})
export class ImageUploadPreviewComponent implements OnInit {

  @Input() previewImgFile;
  @Output() previewImgFileChange: EventEmitter<string> = new EventEmitter();

  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;

  previewImgSrcs: Object;

  upload: boolean = false;
  croppedSrc: any = false;
  config: Object;

  public cropper : AngularCropperjsComponent;

  constructor(public previewImageService: ImageUploadPreviewService) {
    this.config = {
      aspectRatio : 1920 / 500,
      scalable: true,
    }
  }

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



      that.upload = true;
    })

  }

  remove() {
    this.previewImgSrcs = {};
    this.previewImgFile = {};

    this.upload = false;
    this.croppedSrc = false;
  }

  onCropped() {
    const canvas = this.angularCropper.cropper.getCroppedCanvas();
    this.croppedSrc = canvas.toDataURL('image/png');
    this.previewImgFile = this.croppedSrc;
    this.previewImgFileChange.emit(this.previewImgFile);
  }

  onEdit() {
    this.croppedSrc = false;
  }

}
