import { Component, OnInit } from '@angular/core';

import { GuideService } from '../guide.service';
import { UserService } from '../../../shared/services/user/user.service';
import { MatDialog } from "@angular/material";


@Component({
  selector: 'app-shop-guide-product-item',
  templateUrl: './guide-product-item.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideProductItemComponent implements OnInit {


  constructor(
    private guideService: GuideService,
    private userService: UserService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit():void {
    let self = this;

  }

}
