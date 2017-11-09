import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.scss']
})

export class NavigationHeaderComponent implements OnInit {

  @Input() style: boolean = false;

  constructor(

  ) {

  }

  ngOnInit():void {

  }


}
