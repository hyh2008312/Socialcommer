import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';

import { Store } from '../shop';
import { ShopService } from '../shop.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';
import { UserService } from  '../../shared/services/user/user.service';

import { MatSnackBar } from '@angular/material';
import { SnackBarSuccessComponent } from '../snack-bar-success/snack-bar-success.component';

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
  currencies: Object[];

  checked: boolean;

  selectedIndex: number = 0;

  constructor(
    private constantService : ConstantService,
    private shopService : ShopService,
    private userService : UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.currencies = this.constantService.getCurrencies();

    this.storeForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: [''],
      currency: ['', [
        Validators.required
      ]],
      displayName: ['', [
        Validators.required
      ]],
      status: [false, [
        Validators.required
      ]]
    });

    this.storeForm.valueChanges.subscribe(data => this.onValueChanged(data));

    let self = this;
    self.userService.store.subscribe((data) => {
      if( data == null) {
      } else {
        let store = data;
        self.store = store;

        let status = store.status == 'open'? true: false;
        self.storeForm.setValue({
          name: store.name,
          description : store.description,
          currency: store.currency,
          displayName: store.displayName,
          status: status
        });
      }
    });
  }

  //存储错误信息
  formErrors = {
    'name': '',
    'currency': '',
    'displayName':'',
    'status': ''
  };
  //错误对应的提示
  validationMessages = {
    'name': {
      'required': 'This field is required.'
    },
    'currency': {
      'required': 'This field is required.'
    },
    'displayName':{
      'required': 'This field is required.'
    },
    'status':{
      'required': 'This field is required.'
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
    let self = this;

    self.activatedRoute.queryParams.subscribe((data)=> {
      if(data.tab == 'settings' ) {
        self.selectedIndex = 1;
      }
      if(data.tab == 'templates') {
        self.selectedIndex = 0;
      }
    });
  }

  changeStore(): void {
    if(!this.storeForm.valid) {
      return;
    }

    this.storeForm.value.status = this.storeForm.value.status? 'open': 'close';

    let store = this.storeForm.value;
    store.id = this.store.id;
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

}
