import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.scss']
})

export class NavigationHeaderComponent implements OnInit {

  @Input() status: boolean = false;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit():void {

  }


}
