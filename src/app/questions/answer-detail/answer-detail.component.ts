import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Questions, Owner} from '../questions';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})

export class AnswerDetailComponent implements OnInit {

  answer : Questions = new Questions();
  owner : Owner = new Owner();

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
