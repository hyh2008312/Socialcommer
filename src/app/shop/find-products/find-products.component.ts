import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-find-products',
  templateUrl: './find-products.component.html',
  styleUrls: ['../shop.scss']
})

export class FindProductsComponent implements OnInit {

  sortsList = [];
  countries = ['India', 'United States'];
  categories = [{
    name: 'Electronic',
    checked: false
  }, {
    name: 'Home',
    checked: false
  },{
    name: 'Beauty',
    checked: false
  }];
  sources = [{
    name: 'Amazon in',
    checked: false
  }, {
    name: 'Amazon.com',
    checked: false
  }, {
    name: 'Aliexpress',
    checked: false
  }];

  selectedCountries: string;

  public currentIndex: number = 1;
  public selectedChips = [];

  selectable: boolean = true;
  removable: boolean = true;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit():void {
  }

  onSelectedChange(event) {

    for(let item of this.countries) {
      let index = this.selectedChips.findIndex((elem)=>{
        return elem.name == item;
      });

      if (index >= 0) {
        this.selectedChips.splice(index, 1);
        break;
      }
    }

    this.selectedChips.push({name : event, type: 0});

  }

  onCheckedChange(event, type:number) {

    let index = this.selectedChips.findIndex((item)=>{
      return item.name == event.name;
    });
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    }

    if(event.checked) {
      this.selectedChips.push({type: type, ...event});
    }

  }

  remove(sort:any): void {

    let index = this.selectedChips.findIndex((item)=>{
      return item.name == sort.name;
    });

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    }

    switch(sort.type) {
      case 0:
        this.selectedCountries = null;
        break;
      case 1:
        let _index = this.categories.findIndex((item)=>{
          return item.name == sort.name;
        });
        this.categories[_index].checked = false;
        break;
      case 2:
        let _index1 = this.sources.findIndex((item)=>{
          return item.name == sort.name;
        });
        this.sources[_index1].checked = false;
        break;
    }

  }

}
@Component({
  selector: 'app-find-products-dialog',
  templateUrl: './find-products-dialog.component.html',
  styleUrls: ['../shop.scss']
})

export class FindProductsDialog {

}
