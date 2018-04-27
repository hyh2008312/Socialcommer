import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';

import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./_landing-page.scss']
})

export class LandingPageComponent implements OnInit {

  slideIndex: number = 1;

  public show: boolean = true;

  public type: string = 'component';

  public slides = [{
    slideImage: 'https://media.socialcommer.com/source/web/pic/landing-group-20180426.png',
    image: 'https://media.socialcommer.com/source/web/pic/landing-group2-20180426.png',
    title: 'Maryam Hampton\'s Collections',
    content: 'Make your life look way more glamorous than it really is',
    avatar: 'https://media.socialcommer.com/source/web/pic/landing-group-20180426.png',
    name: 'Maria Brural',
    url: 'https://www.socialcommer.com/store/maryamhampton/6'
  }, {
    slideImage: 'https://media.socialcommer.com/source/web/pic/landing-group-20180426.png',
    image: 'https://media.socialcommer.com/source/web/pic/landing-group2-20180426.png',
    title: 'Maryam Hampton\'s Collections',
    content: 'Make your life look way more glamorous than it really is',
    avatar: 'https://media.socialcommer.com/source/web/pic/landing-group-20180426.png',
    name: 'Maria Brural',
    url: 'https://www.socialcommer.com/store/maryamhampton/6'
  }];

  public slides1 = [{
    image: 'https://media.socialcommer.com/cdn/product/cc/5e7ed89d-f3c5-4063-9e63-b68b990f0530.jpg',
    title: 'SAM EDELMAN Sable suede over-the-knee boots',
    salePrice: '$ 15.00 ',
    originalPrice: '$ 10.00 ',
    commission: '20.0'
  }, {
    image: 'https://media.socialcommer.com/cdn/product/cc/5e7ed89d-f3c5-4063-9e63-b68b990f0530.jpg',
    title: 'SAM EDELMAN Sable suede over-the-knee boots',
    salePrice: '$ 15.00 ',
    originalPrice: '$ 10.00 ',
    commission: '20.0'
  }, {
    image: 'https://media.socialcommer.com/cdn/product/cc/5e7ed89d-f3c5-4063-9e63-b68b990f0530.jpg',
    title: 'SAM EDELMAN Sable suede over-the-knee boots',
    salePrice: '$ 15.00 ',
    originalPrice: '$ 10.00 ',
    commission: '20.0'
  }, {
    image: 'https://media.socialcommer.com/cdn/product/cc/5e7ed89d-f3c5-4063-9e63-b68b990f0530.jpg',
    title: 'SAM EDELMAN Sable suede over-the-knee boots',
    salePrice: '$ 15.00 ',
    originalPrice: '$ 10.00 ',
    commission: '20.0'
  }, {
    image: 'https://media.socialcommer.com/cdn/product/cc/5e7ed89d-f3c5-4063-9e63-b68b990f0530.jpg',
    title: 'SAM EDELMAN Sable suede over-the-knee boots',
    salePrice: '$ 15.00 ',
    originalPrice: '$ 10.00 ',
    commission: '20.0'
  }, {
    image: 'https://media.socialcommer.com/cdn/product/cc/5e7ed89d-f3c5-4063-9e63-b68b990f0530.jpg',
    title: 'SAM EDELMAN Sable suede over-the-knee boots',
    salePrice: '$ 15.00 ',
    originalPrice: '$ 10.00 ',
    commission: '20.0'
  }, {
    image: 'https://media.socialcommer.com/cdn/product/cc/5e7ed89d-f3c5-4063-9e63-b68b990f0530.jpg',
    title: 'SAM EDELMAN Sable suede over-the-knee boots',
    salePrice: '$ 15.00 ',
    originalPrice: '$ 10.00 ',
    commission: '20.0'
  }];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 10000
    },
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false
  };

  public config1: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 5,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000
    },
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false
  };

  public config2: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    speed: 800,
    loop: true,
    autoplay: false,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {

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


}
