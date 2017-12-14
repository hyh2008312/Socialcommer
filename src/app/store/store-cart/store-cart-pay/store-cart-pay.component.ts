import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../../store.service';
import { ConstantService } from  '../../../shared/services/constant/constant.service';

@Component({
  selector: 'app-store-cart-pay',
  templateUrl: './store-cart-pay.component.html',
  styleUrls: ['../store-cart.scss']
})

export class StoreCartPayComponent implements OnInit{

  stepOneForm : FormGroup;
  stepTwoForm : FormGroup;

  homeLink:string = '';

  isTotalDialogOpen: boolean = false;

  countries: Object[];

  payMethod: string = 'Credit Card';

  payMethodItem = {
    content: 'Credit Card',
    display: true
  };

  payMethodList = [{
    content: 'Credit Card',
    display: true
  }, {
    content: 'Paypal',
    display: false
  }];

  shippingMethod: string = 'Same as shipping address';

  shippingMethodItem = {
    content: 'Same as shipping address',
    display: false
  };

  shippingMethodList = [{
    content: 'Same as shipping address',
    display: false
  }, {
    content: 'Use a different billing address',
    display: true
  }];

  constructor(
    overlayContainer: OverlayContainer,
    private storeService: StoreService,
    private constant: ConstantService,
    private fb: FormBuilder
  ) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    this.countries = this.constant.getCountries();

    this.stepOneForm = this.fb.group({
      email: ['', [
        Validators.required
      ]],
      confirmEmail: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      Address1: ['', [
        Validators.required
      ]],
      Address2: [''],
      city: ['', [
        Validators.required
      ]],
      country: ['', [
        Validators.required
      ]],
      state: ['', [
        Validators.required
      ]],
      postal: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]]
    });

    this.stepTwoForm = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      Address1: ['', [
        Validators.required
      ]],
      Address2: [''],
      city: ['', [
        Validators.required
      ]],
      country: ['', [
        Validators.required
      ]],
      state: ['', [
        Validators.required
      ]],
      postal: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]]
    });

    this.stepOneForm.valueChanges.subscribe(data => this.onValueChanged(data, this.stepOneForm));

    this.stepTwoForm.valueChanges.subscribe(data => this.onValueChanged(data, this.stepTwoForm));
  }


  //存储错误信息
  formErrors = {
    'email': '',
    'confirmEmail': '',
    'firstName': '',
    'lastName': '',
    'Address1': '',
    'city': '',
    'country': '',
    'state': '',
    'postal': '',
    'phone': ''
  };
  //错误对应的提示
  validationMessages = {
    'email': {
      'required': 'This field is required.',
    },
    'confirmEmail': {
      'required': 'This field is required.',
      'validateEqual': 'Password does not match the Confirm Password.'
    },
    'firstName': {
      'required': 'This field is required.',
    },
    'lastName': {
      'required': 'This field is required.',
    },
    'Address1': {
      'required': 'This field is required.',
    },
    'city': {
      'required': 'This field is required.',
    },
    'country': {
      'required': 'This field is required.',
    },
    'state': {
      'required': 'This field is required.',
    },
    'postal': {
      'required': 'This field is required.',
    },
    'phone': {
      'required': 'This field is required.',
    }
  };

  /**
   * 表单值改变时，重新校验
   * @param data
   */
  onValueChanged(data, form) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = form.get(field);
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

  ngOnInit() {
    let self = this;

    self.storeService.store.subscribe((data) => {
      if(data) {
        let uid = data.templateId == 1? data.templateId:data.uid;
        self.homeLink = `/store/${data.displayName}/${uid}`;
      }
    });
  }

  changePayMethod($event) {
    for(let value of this.payMethodList) {
      if(value.content == $event) {
        this.payMethod = $event;
        this.payMethodItem = value;
        break;
      }
    }
  }

  changeShippingMethod($event) {
    for(let value of this.shippingMethodList) {
      if(value.content == $event) {
        this.shippingMethod = $event;
        this.shippingMethodItem = value;
        break;
      }
    }
  }

  openDialog() {
    this.isTotalDialogOpen = !this.isTotalDialogOpen;
  }

}
