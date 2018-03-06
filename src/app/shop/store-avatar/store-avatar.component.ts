import { Component, OnInit, OnDestroy, Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-shop-store-avatar',
  templateUrl: './store-avatar.component.html',
  styleUrls: ['./_store-avatar.scss']
})

export class StoreAvatarComponent implements OnInit {

  @Input() avatar: any = '';
  @Input() name: string = '';

  failWords;
  image;
  avatarColor: string = '';

  constructor(

  ) {

  }

  ngOnInit():void {
    this.formateAvatar();

  }

  ngOnChanges() {
    let self = this;
    if(self.avatar && self.avatar != '') {
      let image = new Image();
      image.onload = function(){
        self.image = self.avatar;
      };
      image.onerror = function(){
        self.image = false;
        self.formateAvatar();
      };
      image.src = self.avatar;
    }
  }

  formateAvatar() {
    this.failWords = this.name?this.name.substr(0,1).toUpperCase():'A';
    this.avatarColor = 'c-user__bg-' + (Math.floor(Math.random() * 5) + 1);
  }

  ngOnDestroy() {

  }

}
