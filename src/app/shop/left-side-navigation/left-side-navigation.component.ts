import { Input, Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-left-side-navigation',
  templateUrl: './left-side-navigation.component.html',
  styleUrls: ['../shop.scss']
})

export class LeftSideNavigationComponent implements OnInit {

  contents = [{
    icon: 'icon-pic-dashboard',
    text: 'Dashboard',
    router: './dashboard'
  }, {
    icon: 'icon-pic-product',
    text: 'Listings',
    subContent: [{
      text: 'Products',
      router: './listings/products'
    }, {
      text: 'Categories',
      router: './listings/categories'
    }],
    router: './listings',
    slide: true
  }, {
    icon: 'icon-pic-store',
    text: 'Store',
    router: './store'
  }, {
    icon: 'icon-ic-new-hand',
    text: 'To-do List',
    router: './toDoList'
  }, {
    icon: 'icon-ic-pc-set',
    text: 'Settings',
    router: './settings'
  }];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  changeSlide(obj:any, index: number) {
    if(obj.subContent) {
      this.router.navigate([`${obj.subContent[0].router}`], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate([`${obj.router}`], {relativeTo: this.activatedRoute});
    }
  }

}
