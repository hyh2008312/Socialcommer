import {Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-report-title',
  templateUrl: './report-title.component.html',
  styleUrls: ['../_account-report.scss']
})

export class ReportTitleComponent implements OnInit {
  @Input() status: number = 0;

  constructor() {
  }

  ngOnInit(): void {

  }


}
