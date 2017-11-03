import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';

import { Store } from '../shop';
import { ShopService } from '../shop.service';
import { ConstantService } from  '../../shared/services/constant/constant.service';
import { UserService } from  '../../shared/services/user/user.service';

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
    private activatedRoute: ActivatedRoute
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
      'required': 'Name is required.'
    },
    'currency': {
      'required': 'Currency is required.'
    },
    'displayName':{
      'required': 'Display name is required.'
    },
    'status':{
      'required': 'Status is required.'
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
    let firstInit = false;
    self.userService.store.subscribe((data) => {
      if(!firstInit) {
        firstInit = true;
        if( data == null ) {
          self.shopService.getStore().then((data) => {

            let store = data[0];
            self.store = store;
            let status = store.status == 'open'? true: false;
            let _store = store;
            _store.status = status;
            self.userService.addStore(_store);

            self.storeForm.setValue({
              name: store.name,
              description : store.description,
              currency: store.currency,
              displayName: store.displayName,
              status: status
            });
          });
        } else {
          let store = data;
          self.store = store;
          self.userService.addStore(store);

          let status = store.status == 'open'? true: false;
          self.storeForm.setValue({
            name: store.name,
            description : store.description,
            currency: store.currency,
            displayName: store.displayName,
            status: status
          });
        }
      }
    });

    self.activatedRoute.queryParams.subscribe((data)=> {
      if(data.tab == 'settings' ) {
        self.selectedIndex = 0;
      }
      if(data.tab == 'templates') {
        self.selectedIndex = 1;
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
      self.userService.addStore(data);
    });
  }

}
