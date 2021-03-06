import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';

import { Store } from '../shop';
import { ShopService } from '../shop.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';
import { UserService } from  '../../shared/services/user/user.service';

import { MatSnackBar, MatDialog} from '@angular/material';
import { SnackBarSuccessComponent } from '../snack-bar-success/snack-bar-success.component';
import { StoreStatusChangeDialogComponent } from "../store-status-change-dialog/store-status-change-dialog.component";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['../shop.scss']
})

export class StoreComponent implements OnInit {

  store: Store = new Store();
  storeForm: FormGroup;
  storeErr: any = false;

  currency: string;
  currencies: any[];

  countries: any[];

  checked: boolean;

  status: any = false;

  constructor(
    private constantService : ConstantService,
    private shopService : ShopService,
    private userService : UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar,
  private dialog: MatDialog
  ) {
    this.currencies = this.constantService.getCurrencies();

    this.storeForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: [''],
      countryId: ['', [
        Validators.required
      ]],
      displayName: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9\.-]*$')
      ]],
      status: ['']
    });

    this.storeForm.valueChanges.subscribe(data => this.onValueChanged(data));

    let self = this;
    self.userService.store.subscribe((data) => {
      if( data == null) {
      } else {
        let store = data;
        self.store = store;

        self.storeForm.setValue({
          name: store.name,
          description : store.description,
          countryId: store.country.id,
          displayName: store.displayName,
          status: store.status == 'open'? true: false
        });

        this.status = store.status == 'open'? true: false;

        self.currency = store.currency;
      }
    });

    self.userService.countryList.subscribe((data) => {
      if(data) {
        this.countries = data;
      }
    })
  }

  //存储错误信息
  formErrors = {
    'name': '',
    'countryId': '',
    'displayName':''
  };
  //错误对应的提示
  validationMessages = {
    'name': {
      'required': 'This field is required.'
    },
    'countryId': {
      'required': 'This field is required.'
    },
    'displayName':{
      'required': 'This field is required.',
      'pattern': 'Permalink only lowercase alphanumeric and "-" allowed.'
    }
  };

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.storeForm.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
          break;
        }
      }

    }

  }

  ngOnInit():void {

  }

  setCurrency(countryId) {
    let countryCode = 'US';

    for(let country of this.countries) {
      if(countryId == country.id) {
        countryCode = country.code;
        break;
      }
    }

    for(let item of this.currencies) {
      if(item.country == countryCode) {
        this.currency = item.code;
      }
    }

  }

  changeStore(): void {
    if(!this.storeForm.valid) {
      return;
    }

    this.storeForm.value.status = this.storeForm.value.status? 'open': 'close';

    let store = this.storeForm.value;
    store.id = this.store.id;
    store.currency = this.currency;
    let self = this;

    this.shopService.changeStore(store).then((data) => {
      self.openSnackBar();
      self.userService.addStore(data);
    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }

  statusDialog() {
    let dialogRef = this.dialog.open(StoreStatusChangeDialogComponent, {
      data: {
        status : this.status
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.status == true) {
        this.storeForm.patchValue({
          status: dialogRef.componentInstance.data.status
        });
        this.status = dialogRef.componentInstance.data.status;
      }
    });
  }

  changeStatus($event) {
    if($event != this.status) {
      this.status = $event;
      if(!this.status) {
        this.statusDialog();
      }
    }
  }

}
