import {Input, Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-shop-account-report-item',
  templateUrl: './account-report-item.component.html',
  styleUrls: ['../account-report/_account-report.scss']
})

export class AccountReportItemComponent implements OnInit {

  @Input() status: number = 0;
  @Input() product: any;
  @Input() index: number = 0;
  @Input() page: number = 1;
  @Input() pageSize: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }
}
