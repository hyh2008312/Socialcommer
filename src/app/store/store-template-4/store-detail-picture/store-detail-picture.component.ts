import { Input, Output, Component, OnInit, OnChanges} from '@angular/core';
import {AnimationConfig, ICarouselConfig} from '../../../shared/components/angular4-carousel/src/app/services/declarations/index';

@Component({
  selector: 'app-shop-detail-4-picture',
  templateUrl: './store-detail-picture.component.html',
  styleUrls: ['./store-detail-picture.scss']
})


export class StoreDetailPictureComponent implements OnInit {

  @Input() public images:any = [];
  @Input() public selectedImage: any;
  @Input() public imageSources: string[] = [];

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 5000,
    stopAutoplayMinWidth: 0
  };

  public slideNumber: number = 0;

  constructor() {

  }

  ngOnInit():void {
  }

  selectImage(image: any) {
    this.selectedImage = image;
  }

  slideChange(event) {
    this.slideNumber = event;
  }

}
