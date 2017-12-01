import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-template-3',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-3.scss']
})

export class MainPageComponent implements OnInit {

  storeName: string = '';
  isDialogOpen: boolean = false;
  text: string = '';

  constructor(
    private router : Router,
    private storeService: StoreService
  ) {

  }

  ngOnInit():void {
    let self = this;

    self.storeService.store.subscribe((data) => {
      if(data) {
        self.storeName = data.context? data.context.nameTag: data.name;
        self.text = data.description;
      }
    });
  }

  ngOnDestroy() {

  }

  openDialog(event?:any) {
    if(event) {
      return this.isDialogOpen = false;
    }
    this.isDialogOpen = !this.isDialogOpen;
  }

}
