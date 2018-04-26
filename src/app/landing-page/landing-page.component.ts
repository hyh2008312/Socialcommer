import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./_landing-page.scss']
})

export class LandingPageComponent implements OnInit {

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

  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }


}
