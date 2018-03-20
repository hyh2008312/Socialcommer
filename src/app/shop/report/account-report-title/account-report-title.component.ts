import {Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-account-report-title',
  templateUrl: './account-report-title.component.html',
  styleUrls: ['../account-report/_account-report.scss']
})

export class AccountReportTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor() {
  }

  ngOnInit(): void {

  }


}
