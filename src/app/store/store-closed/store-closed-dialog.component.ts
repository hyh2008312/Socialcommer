import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";


@Component({
  selector: 'app-store-closed-dialog',
  templateUrl: './store-closed-dialog.component.html',
  styleUrls: ['./_store-closed.scss']
})

export class StoreClosedDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<StoreClosedDialogComponent>,
              private router:Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

  }
}
