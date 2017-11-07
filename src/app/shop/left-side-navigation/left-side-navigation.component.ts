import { Input, Component, OnInit} from '@angular/core';

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
    router: './listings',
    router1: './products'
  }, {
    icon: 'icon-pic-store',
    text: 'Store',
    router: './store'
  }, {
    icon: 'icon-ic-pc-set',
    text: 'To-do List',
    router: './toDoList'
  }, {
    icon: 'icon-ic-pc-set',
    text: 'Settings',
    router: './settings'
  }];
  constructor(
  ) { }

  ngOnInit(): void {

  }

}
