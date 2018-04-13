import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { GuideService } from '../guide.service';
import { UserService } from '../../../shared/services/user/user.service';
import { MatDialog } from "@angular/material";


@Component({
  selector: 'app-shop-guide-product-list',
  templateUrl: './guide-product-list.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideProductListComponent implements OnInit {

  @Input() productList: any = {};
  @Input() index: any = 0;
  @Output() productListChange = new EventEmitter<any>();

  constructor(
    private guideService: GuideService,
    private userService: UserService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit():void {

  }

}
