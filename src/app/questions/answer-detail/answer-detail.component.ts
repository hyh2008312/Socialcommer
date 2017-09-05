import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Questions, Owner, CurrentUser} from '../questions';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})

export class AnswerDetailComponent implements OnInit {

  answer : Questions = new Questions();
  owner : Owner = new Owner();
  currentUser: CurrentUser = new CurrentUser();

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit():void {

    if(window['WebAppInterface']) {
      window['WebAppInterface'].toCancelProgress();
    }

    let id = this.route.snapshot.params['id'];
    this.questionsService.getAnswerDetail(id).then(answer => {
      this.answer = answer;
      this.owner = answer.owner;
      if(answer.owner.currentUser == null) {
        this.currentUser = {
          follow: false
        };
      } else {
        this.currentUser = answer.owner.currentUser;
      }

      return this;
    });

  }

  toProfile(id:number) {
    if(window['WebAppInterface']) {
      window['WebAppInterface'].toProfile(id);
    }
  }


  getPosition(company:string, position:string) {
    if(company && position) {
      return `${position}  @  ${company}`;
    } else if(position && !company) {
      return `${position}`;
    } else if(company && !position) {
      return `${company}`;
    }
  }
}
