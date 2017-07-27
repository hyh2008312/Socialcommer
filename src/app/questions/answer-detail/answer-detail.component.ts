import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Questions, Owner, Userprofile, CurrentUser} from '../questions';
import { QuestionsService } from '../questions.service';

import { WindowRef } from '../../provider/window-ref.provider';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})

export class AnswerDetailComponent implements OnInit {

  answer : Questions = new Questions();
  owner : Owner = new Owner();
  userprofile: Userprofile = new Userprofile();
  currentUser: CurrentUser = new CurrentUser();

  constructor(
    private questionsService: QuestionsService,
    private windowRef: WindowRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit():void {

    this.route.paramMap
      .switchMap((params: ParamMap) =>{
        return this.questionsService.getAnswerDetail(+params.get('id'))
      })
      .subscribe(answer => {
        this.answer = answer;
        this.owner = answer.owner;
        this.userprofile = answer.owner.userprofile;
        if(answer.owner.currentUser == null) {
          this.currentUser = {
            follow: false
          };
        }

        return this;
      });

  }

  toProfile(id:number) {
    this.windowRef.webAppInterface && this.windowRef.webAppInterface.toProfile(id);
  }
}
