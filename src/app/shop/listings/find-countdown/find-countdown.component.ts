import {
  Input,
  Output,
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-find-countdown',
  templateUrl: './find-countdown.component.html',
  styleUrls: ['./_find-countdown.scss']
})

export class FindCountdownComponent implements OnInit, OnDestroy {

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
      self.second = (this._diff % 3600) % 60;
      if (self.days == 0 && self.hours == 0 && self.minute == 0 && self.second == 0) {
        window.clearInterval(self.timer);
      }
      self.ref.detectChanges();
    }
  }

  constructor(private ref: ChangeDetectorRef, private ngZone: NgZone) {

  }

  ngOnInit(): void {

  }

  ngAfterViewChecked() {
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
    this.ref.detach();
  }
}
