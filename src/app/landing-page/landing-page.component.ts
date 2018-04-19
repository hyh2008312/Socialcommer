import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';

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



}
