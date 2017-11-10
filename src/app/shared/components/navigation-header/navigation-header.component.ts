import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../../../login/login/login.component';
import { SignUpComponent } from '../../../login/sign-up/sign-up.component';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.scss']
})

export class NavigationHeaderComponent implements OnInit {

  @Input() status: boolean = false;

  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit():void {

  }

  openLogIn(): void {
    this.isPopOpen = false;

    let dialogRef = this.dialog.open(LoginComponent, {
      data: {}
    });

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openSignUp(): void {
    this.isPopOpen = false;

    let dialogRef = this.dialog.open(SignUpComponent, {
      data: {}
    });

    dialogRef.componentInstance.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  isPopOpen: boolean = false;

  openPop() {
    this.isPopOpen = !this.isPopOpen;
  }


}
