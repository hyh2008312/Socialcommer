import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { ShopService } from "../shop.service";

import { UserService } from '../../shared/services/user/user.service';
import { StoreToRewardDialogComponent } from "../store-to-reward-dialog/store-to-reward-dialog.component";
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['../shop.scss']
})

export class ToDoListComponent implements OnInit {

  editRouter: string = '/shop/store/templates/edit';

  displayName: string = '';

  shareLink: string = '';
  text: string = '';

  sub: any;

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit():void {

    let self = this;
    self.shopService.templateUid.subscribe((data) => {
      if(data) {
        self.editRouter = '/shop/templates/edit/' + data;
      }
    });

    self.sub = self.userService.store.subscribe((data) => {
      if(data) {
        console.log(data);
        self.displayName = data.displayName;
        self.shareLink = 'http://' + window.location.host + '/store/' + self.displayName + '/'
          + (data.template && data.template.templateId? data.template.templateId: 5);
        self.text = data.description;
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
