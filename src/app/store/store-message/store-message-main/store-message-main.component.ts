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

  testList: any = [1, 2, 3];

  replyMessage: any = '';
  replyMessageForm: FormGroup;

  isMessageEmpty: boolean = false;
  replayPlaceholder: any = 'Tell us about your issue（In English)';
  // 两个条件一个是消息是否为空，一个是消息是否进行了关闭
  isNoMessage: boolean = false;
  //这个问题是否解决
  isClose: boolean = false;
  customerMessage: any;

  //message列表的消息
  messageList: any = [];

  //这个问题状态
  status: any = '';


  lineId: any = 3;
  OrderNumber = 1754301234;
  customerEmail = 'luzhenqiang@xberts.cn';

  submitTitle: string = 'SUBMIT';


  constructor(private fb: FormBuilder,
              private storeMessage: StoreMessageService) {
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
      this.replayPlaceholder = 'Tell us about your issue（In English)';
      this.submitTitle = 'SUBMIT';
    } else {
      this.replayPlaceholder = 'Leave a reply（In English)';
      this.submitTitle = 'REPLY';
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
}
