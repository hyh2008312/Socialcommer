import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store-template-edit-4-navigation',
  templateUrl: './store-navigation.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class StoreNavigationEditFourComponent implements OnInit {
  @Output() public routerChange: EventEmitter<number> = new EventEmitter();

  @Input() navigationIndex = 0;


  contents = [
    {
      text: 'HOME'
    },
    {
      text: 'COLLECTIONS'
    },
    {
      text: 'BLOG'
    },
    {
      text: 'ABOUT'
    }
  ];


  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }

  changeNavigation(index) {
    this.navigationIndex = index;
    this.routerChange.emit(index);
  }

}
