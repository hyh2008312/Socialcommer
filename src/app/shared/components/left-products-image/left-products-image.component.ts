import { Input, Output, Component, OnInit, EventEmitter, ContentChild} from '@angular/core';
import { ICarouselConfig, AnimationConfig } from '../angular4-carousel/index';

@Component({
  selector: 'app-left-products-image',
  templateUrl: './left-products-image.component.html',
  styleUrls: ['./left-products-image.scss']
})



export class LeftProductsImageComponent implements OnInit {

  @Input() public images = [
    {
      id: 0,
      src: '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    },
    {
      id: 1,
      src: '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    },
    {
      id: 2,
      src: '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    },
    {
      id: 3,
      src: '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    },
    {
      id: 4,
      src: '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    }
  ];

  public selectedImage: any;

  public imageSources: string[] = [
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg',
    '//img14.360buyimg.com/n1/jfs/t5404/37/1574400102/222809/4907a2f6/59123908Nffed2d63.jpg'
  ];

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
    this.selectedImage = this.images[0];
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  slideChange(event) {
    this.slideNumber = event;
  }

}
