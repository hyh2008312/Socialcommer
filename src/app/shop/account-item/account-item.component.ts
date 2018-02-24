import {Input, Output, Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['../_account.scss']
})

export class AccountItemComponent implements OnInit {
  @Input() product: any;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }
}
