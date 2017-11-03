import { Input, Output, Component, OnInit, OnChanges} from '@angular/core';
import { ICarouselConfig, AnimationConfig } from '../angular4-carousel/index';

@Component({
  selector: 'app-left-products-image',
  templateUrl: './left-products-image.component.html',
  styleUrls: ['./left-products-image.scss']
})


export class LeftProductsImageComponent implements OnInit {

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
