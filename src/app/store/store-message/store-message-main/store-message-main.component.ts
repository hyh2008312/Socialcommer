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
  replayPlaceholder: any = 'Tell us about your issue';

  isNoMessage: boolean = true;

  customerMessage: any;
  ticketTitle: string = 'Message';

  //message列表的消息
  messageList: any = [];
  //这个问题是否解决
  isClose: boolean = false;
  //这个问题状态
  status: any = '';

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
      number: 1720886145,
      email: 'hyh2017312@gmail.com',
      context: this.replyMessage
    };
    this.storeMessage.submitIssue(options, 60).then((data) => {
      this.customerMessage = data;
      this.messageList = data.communication.messages;
      this.status = data.communication.status;
      this.judgeMessageIsClose();
      this.judgeMessageIsEmpty();
      this.replyMessage = '';
    })
  }

  /*请求私信消息*/
  requestMessage() {
    let lineId = 60;
    let options = {
      number: 1720886145,
      email: 'hyh2017312@gmail.com',
    };
    this.storeMessage.requestMessage(options, lineId).then((data) => {
      this.customerMessage = data;
      this.status = data.communication.status;
      this.messageList = data.communication.messages;
      this.judgeMessageIsClose();
      this.judgeMessageIsEmpty();

    });
  }

  /*点击解决问题，关闭问题*/
  requestCloseMessage() {
    let lineId = 60;
    let options = {
      number: 1720886145,
      email: 'hyh2017312@gmail.com',
    };
    this.storeMessage.requestCloseMessage(options, lineId).then((data) => {
      this.status = 'Closed';
      this.judgeMessageIsClose();
    });
  }

  /*判断是否有消息*/
  judgeMessageIsEmpty() {
    if (this.messageList.length > 0) {
      this.isNoMessage = true;
      this.ticketTitle = 'Message';
      this.replayPlaceholder = 'Leave a reply';
    } else {
      this.isNoMessage = false;
      this.ticketTitle = 'Submit a Ticket';
      this.replayPlaceholder = 'Tell us about your issue';

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
