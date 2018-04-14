import { Component, OnInit, OnDestroy} from '@angular/core';

import { UserService } from '../../shared/services/user/user.service';
import { StoreToRewardDialogComponent } from "../store-to-reward-dialog/store-to-reward-dialog.component";
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['../shop.scss']
})

export class ToDoListComponent implements OnInit, OnDestroy {

  editRouter: string = '/shop/store/templates/edit';

  displayName: string = '';

  stepOneBonus: boolean = false;
  stepTwoBonus: boolean = false;

  firstStoreBonus: boolean = false;

  blogCount: number = 0;

  shareLink: string = '';
  text: string = '';

  sub: any;
  sub1: any;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit():void {

    let self = this;

    self.sub = self.userService.store.subscribe((data) => {
      if(data) {
        self.displayName = data.displayName;
        self.shareLink = 'http://' + window.location.host + '/store/' + self.displayName + '?source=share';
        self.text = data.description;
        self.editRouter = '/shop/templates/edit/' + (data.template && data.template.templateId? data.template.templateId: 5);

        self.stepOneBonus = data.firstShareBonus;
        self.stepTwoBonus = data.firstOrderBonus;
        self.firstStoreBonus = data.setStoreBonus;
      }
    });

    self.sub1 = self.userService.currentUser.subscribe((data) => {
      if(data) {
        self.blogCount = data.blogCount;
      }
    });

  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  openBonusDialog() {
    let dialogRef = this.dialog.open(StoreToRewardDialogComponent, {
      data: {
        shareLink: this.shareLink,
        text: this.text
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
