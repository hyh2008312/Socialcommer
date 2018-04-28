import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';

import {LandingPageService} from './landing-page.service';

import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./_landing-page.scss']
})

export class LandingPageComponent implements OnInit {

  slideIndex: number = 0;

  currency: string = 'USD';

  disabled: boolean = false;

  public show: boolean = true;

  public type: string = 'component';

  public slides = [{
    slideImage: 'https://media.socialcommer.com/source/web/pic/landing-group-20180426.png',
    image: 'https://media.socialcommer.com/source/web/pic/landing-group2-20180426.png',
    title: 'Maryam Hampton\'s Collections',
    content: 'Make your life look way more glamorous than it really is',
    avatar: 'https://media.socialcommer.com/image/other/b035babd-1171-4235-a4fa-464645568919.jpg',
    name: 'Maria Brural',
    url: 'https://www.socialcommer.com/store/maryamhampton/6'
  }];

  public slides1:any;

  loaded: boolean = false;

  public config1: SwiperConfigInterface = {
    observer: true,
    threshold: 50,
    direction: 'horizontal',
    slidesPerView: 5,
    speed: 800,
    autoplay: {
      delay: 5000
    },
    loop: true,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    breakpoints: {
      959: {
        autoplay: false
      },
      600: {
        autoplay: false
      }
    }
  };


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private landingPageService: LandingPageService
  ) {
    this.getProductList();
  }

  ngOnInit():void {
    this.activatedRoute.queryParams.subscribe((data)=> {
      if(Object.keys(data).length > 0) {
        let ads: any = {};
        if(data.utm_source) {
          ads.utm_source = data.utm_source;
        }
        if(data.utm_medium) {
          ads.utm_medium = data.utm_medium;
        }
        if(data.utm_campaign) {
          ads.utm_campaign = data.utm_campaign;
        }
        if(data.utm_term) {
          ads.utm_term = data.utm_term;
        }
        if(data.utm_content) {
          ads.utm_content = data.utm_content;
        }

        this.userService.addCurrentAds(ads);
      }
    });
  }

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  public onIndexChange(index: number): void {
    this.slideIndex = index;
  }

  changeIndex(index) {
    this.slideIndex = index;
    this.componentRef.directiveRef.setIndex(this.slideIndex);
  }

  public onIndexChange1(index: number): void {
  }

  getProductList() {
    this.landingPageService.getProductList().then((data) => {
      this.slides1 = [...data];
      this.slides1.push(...data);
    });
  }


}
