import {Input, Output, Component, OnInit, ChangeDetectionStrategy, NgZone, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-store-five-countdown',
  templateUrl: './store-countdown.component.html',
  styleUrls: ['./_store-countdown.scss'],

})

export class StoreCountdownComponent implements OnInit, OnDestroy {

  @Input() countdownTimer: number = 0;
  // 倒计时
   timer: any;
   _diff: number;
   days: number;
   hours: number;
   minute: number;
   second: number;

  isFirst: boolean = false;

  settingTimes(time) {
    return (self) => {
      self._diff = Math.floor(time / 1000);
      self.days = Math.floor(self._diff / 3600 / 24);
      self.hours = Math.floor(self._diff / 3600 % 24);
      self.minute = Math.floor((self._diff % 3600) / 60);
      self.second = (self._diff % 3600) % 60;
      if (self.days == 0 && self.hours == 0 && self.minute == 0 && self.second == 0) {
        window.clearInterval(self.timer);
      }
      self.ref.detectChanges();
    }
  }

  constructor(private ref : ChangeDetectorRef, private ngZone: NgZone) {

  }

  ngOnInit(): void {

  }

  ngAfterViewChecked() {
    /* let self = this;
     if (this.countdownTimer <= 0) {
       return;
     }
     this.timer = window.setInterval(() => {
       self.settingTimes(this.countdownTimer - new Date().getTime());
     }, 1000);*/


  }

  ngOnChanges(): void {
    if (this.countdownTimer <= 0) {
      window.clearInterval(this.timer);
      console.log('ngOnChanges countdownTimer');
      return;
    }
    if (!this.isFirst) {
      this.isFirst = true;

      let self = this;
      if (self.timer) {
        window.clearInterval(self.timer);
      }

      self.ngZone.runOutsideAngular(() => {
        self.timer = window.setInterval(() => {
          self.settingTimes(self.countdownTimer - new Date().getTime())(self);
        }, 1000);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  }
}
