import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENTER } from '@angular/cdk/keycodes';

import { ShopService } from '../shop.service';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-find-products',
  templateUrl: './find-products.component.html',
  styleUrls: ['../shop.scss']
})

export class FindProductsComponent implements OnInit {

  searchForm: FormGroup;

  sortsList = [];
  sources = ['Amazon.in', 'Amazon.com'];
  categories:any = [];

  selectedSource: string;

  public currentIndex: number = 1;
  public selectedChips = [];

  selectable: boolean = true;
  removable: boolean = true;

  // MatPaginator Inputs
  productIndex: number = 1;
  length:number = 0;
  pageSize = 15;
  pageSizeOptions = [15, 30];

  // Product list
  productList: any = false;

  searchKey: string = '';

  constructor(
    private shopService: ShopService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchKey: ['']
    });
  }

  ngOnInit():void {
    this.getProductList();

    let self = this;
    self.userService.pubCategory.subscribe((data) => {
      if(data) {
        for (let value of data) {
          self.categories.push({
            checked: false,
            ...value
          });
        }
      }
    });
  }

  clearSearchKey() {
    this.searchKey = '';
  }


  // MatPaginator Output
  changePage(event, type) {
    this.pageSize = event.pageSize;
    this.productIndex = event.pageIndex + 1;
    this.getProductList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onSelectedChange(event) {

    let isChange = false;
    for(let item of this.sources) {
      let index = this.selectedChips.findIndex((elem)=>{
        return elem.name == item;
      });

      if (index >= 0) {
        isChange = true;
        break;
      }
    }
    if(isChange) {
      this.selectedChips = [];
    }

    this.selectedChips.push({name : event, type: 0});
    this.getCategoryList();
    this.getProductList();
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
    this.getProductList();

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
        this.selectedSource = null;
        this.selectedChips = [];
        this.categories = [];
        break;
      case 1:
        let _index = this.categories.findIndex((item)=>{
          return item.name == sort.name;
        });
        this.categories[_index].checked = false;
        break;
    }
    this.getProductList();
  }

  getProductList() {
    let cats = [];
    let source = [];
    for(let value of this.selectedChips) {
      if(value.type == 0) {
        source.push(value.name);
      }
      if(value.type == 1) {
        cats.push(value.id);
      }
    }

    let self = this;
    this.shopService.getRecommendProductList({
      cats,
      source,
      page: this.productIndex,
      page_size: this.pageSize,
      q: this.searchKey
    }).then((data) => {

      self.length = data.count;

      self.productList = data.results;
    })
  }

  getCategoryList() {

    this.shopService.getSubCategory({
      source: this.selectedSource.toLocaleLowerCase()
    }).then((data) => {
      this.categories = [];
      for(let value of data) {
        this.categories.push({
          id: value.objectUrlId,
          name: value.name,
          checked: false
        })
      }

    })
  }

}
