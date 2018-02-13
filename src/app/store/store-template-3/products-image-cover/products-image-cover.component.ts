import { Input, Output, Component, OnInit, OnChanges} from '@angular/core';
import { ICarouselConfig, AnimationConfig } from '../../../shared/components/angular4-carousel/index';

@Component({
  selector: 'app-store-template-3-products-image-cover',
  templateUrl: './products-image-cover.component.html',
  styleUrls: ['./products-image-cover.scss']
})


export class ProductsImageCoverComponent implements OnInit {

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
  @Input() insertImage: any = false;
  ngOnChanges() {
    if(this.insertImage) {
      this.selectedImage = this.insertImage;
      this.slideNumber = 0;
      this.config = {
        verifyBeforeLoad: true,
        log: false,
        animation: true,
        animationType: AnimationConfig.SLIDE,
        autoplay: true,
        autoplayDelay: 5000,
        stopAutoplayMinWidth: 0
      };
    }
    if(this.insertImage == null){
      this.selectedImage = this.imageSources[0];
    }
  }

  selectImage(image: any) {
    this.selectedImage = image;
  }

  slideChange(event) {
    this.slideNumber = event;
  }

}
