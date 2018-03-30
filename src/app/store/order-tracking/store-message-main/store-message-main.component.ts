import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {StoreService} from '../../store.service';
import {StoreMessageService} from '../store-message.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-store-message-main',
  templateUrl: './store-message-main.component.html',
  styleUrls: ['../_store-message.scss']
})

export class StoreMessageMainComponent implements OnInit {

  order: any = {};
  shippingAddress: any;
  shippingPrice: any = {};
  replyMessage: any = '';
  replyMessageForm: FormGroup;

  isMessageEmpty: boolean = false;
  replayPlaceholder: any = 'Tell us about your issue';
  // 两个条件一个是消息是否为空，一个是消息是否进行了关闭
  isNoMessage: boolean = false;
  //这个问题是否解决
  isClose: boolean = false;
  customerMessage: any;


  //message列表的消息
  messageList: any = [];

  //这个问题状态
  status: any = '';


  lineId: number;
  OrderNumber: number;
  customerEmail: string;

  submitTitle: string = 'SUBMIT';
  // 是否显示提示order的小按钮
  isShowRelatedOrder: boolean = true;
  // 是否显示order的遮罩
  isShowRelatedOrderMask: boolean = false;

  constructor(private fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private storeMessage: StoreMessageService) {

    this.activeRoute.queryParams.subscribe(params => {
      this.lineId = parseInt(params['lineId']);
      this.OrderNumber = parseInt(params['OrderNumber']);
      this.customerEmail = params['customerEmail'];


    });

    this.replyMessageForm = this.fb.group({
      replyMessage: ['']
    });
    this.requestMessage();

  }

  ngOnInit() {

  }

  /*提交问题*/
  submitCustomerService() {
    if (!this.isMessageEmpty) {
      return;
    }
    let options = {
      number: this.OrderNumber,
      email: this.customerEmail,
      context: this.replyMessage
    };
    this.storeMessage.submitIssue(options, this.lineId).then((data) => {
      this.customerMessage = data;
      this.messageList = data.communication.messages;
      this.status = data.communication.status;
      this.judgeMessageIsClose();
      this.judgeMessageIsEmpty();
      this.updateWord();
      this.replyMessage = '';
    })
  }

  /*请求私信消息*/
  requestMessage() {
    let options = {
      number: this.OrderNumber,
      email: this.customerEmail,
    };
    this.storeMessage.requestMessage(options, this.lineId).then((data) => {
      this.customerMessage = data;
      this.status = data.communication.status;
      this.messageList = data.communication.messages;
      this.judgeMessageIsClose();
      this.judgeMessageIsEmpty();
      this.updateWord();

    });
  }

  /*点击解决问题，关闭问题*/
  requestCloseMessage() {

    let options = {
      number: this.OrderNumber,
      email: this.customerEmail,
    };
    this.storeMessage.requestCloseMessage(options, this.lineId).then((data) => {
      this.status = 'Closed';
      this.judgeMessageIsClose();
      this.judgeMessageIsEmpty();
      this.updateWord();
    });
  }

  /*判断是否有消息*/
  judgeMessageIsEmpty() {
    if (this.messageList.length > 0) {
      this.isNoMessage = true;
    } else {
      this.isNoMessage = false;
    }
  }

  // 修改按钮的状态和文字
  updateWord() {
    if (!this.isClose || !this.isNoMessage) {
      this.replayPlaceholder = 'Tell us about your issue';
      this.submitTitle = 'SUBMIT';
      this.isShowRelatedOrder = true;
    } else {
      this.replayPlaceholder = 'Leave a reply';
      this.submitTitle = 'REPLY';
      this.isShowRelatedOrder = false;
    }
  }


  /*判断该私信是否关闭*/
  judgeMessageIsClose() {
    if (this.status === 'Closed') {
      this.isClose = false;
    } else {
      this.isClose = true;
    }
  }

  changeMessageStatus(message: any) {
    this.replyMessage = message;
    let str = message.trim();
    if (str.length == 0) {
      this.isMessageEmpty = false;
    } else {
      this.isMessageEmpty = true;
    }
  }

  changeOrderMask(): void {
    this.isShowRelatedOrderMask = !this.isShowRelatedOrderMask;
  }
}
