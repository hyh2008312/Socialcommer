import {Input, Output, Component, OnInit, EventEmitter, ElementRef, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-bonus-item',
  templateUrl: './bonus-item.component.html',
  styleUrls: ['./_bonus-item.scss']
})

export class BonusItemComponent implements OnInit {

  @Input() monthSale: any = 500;

  mySale: any = 0;

  bonusList: any[] = [{
    bonus: 50,
    sales: 500
  }, {
    bonus: 150,
    sales: 1000
  }, {
    bonus: 350,
    sales: 2000
  }, {
    bonus: 600,
    sales: 3000
  }, {
    bonus: 1000,
    sales: 4000
  }];

  currency: string = 'USD';

  constructor(
    private userService: UserService,
    private elementRef: ElementRef
  ) {
    this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.paintTarget();
  }

  paintTarget() {
    if(this.mySale < this.monthSale - 60) {
      this.mySale += (this.monthSale / 60);
    } else {
      let target = this.elementRef.nativeElement.querySelector('.xb-bonus__target');
      target.style.width = ((this.monthSale / this.bonusTarget) * 100 > 100? 100: (this.monthSale / this.bonusTarget) * 100) + "%";
      return;
    }

    let target = this.elementRef.nativeElement.querySelector('.xb-bonus__target');
    target.style.width = ((this.mySale / this.bonusTarget) * 100 > 100? 100: (this.mySale / this.bonusTarget) * 100) + "%";

    requestAnimationFrame(() => this.paintTarget());
  }

  get targetIndex() {
    let index = -1;
    for(let i = 0; i <= this.bonusList.length-1; i++) {
      let sale = this.bonusList[i].sales;
      if(this.monthSale < sale) {
        break;
      }
      index++;
    }
    return index;
  }

  get bonusTarget() {
    return this.bonusList[this.bonusList.length - 1].sales;
  }
}
