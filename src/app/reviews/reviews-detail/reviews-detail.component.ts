import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Reviews, Applicant, Review, Project, Reviewer, Userprofile, CurrentUser, Image, Achievement, Interact} from '../reviews';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-reviews-detail',
  templateUrl: './reviews-detail.component.html',
  styleUrls: ['./reviews-detail.component.scss']
})

export class ReviewsDetailComponent implements OnInit {

  reviews : Reviews = new Reviews();
  interact : Interact = new Interact();
  applicant : Applicant = new Applicant();
  review : Review = new Review();
  project : Project = new Project();
  reviewer : Reviewer = new Reviewer();
  userprofile : Userprofile = new Userprofile();
  currentUser : CurrentUser = new CurrentUser();
  image : Image = new Image();
  achievement : Achievement = new Achievement();

  userId : string = '';
  scrollUp : boolean = false;

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit():void {
    if(window['WebAppInterface']) {
      this.userId = window['WebAppInterface'].getUserId();
    }

    let id = this.route.snapshot.params['id'];
    this.reviewsService.getReviewsDetail(id).then(reviews => {
      this.reviews = reviews;
      this.interact = this.reviews.interact;

      this.applicant = reviews.applicant;
      this.review = reviews.applicant.review;
      this.project = reviews.applicant.review.project;
      this.reviewer = reviews.applicant.reviewer;
      this.userprofile = reviews.applicant.reviewer.userprofile;
      this.image = reviews.image;
      if(reviews.applicant.reviewer.userprofile.current_user == null) {
        this.currentUser = {
          follow: false
        };
      } else {
        this.currentUser = reviews.applicant.reviewer.userprofile.current_user;
      }

      if(window['WebAppInterface']) {
        window['WebAppInterface'].toPrice(reviews.applicant.review.project.final_price.amount,
          reviews.applicant.review.project.buy_url);
      }

      let self = this;

      self.reviewsService.getAchievement(self.reviewer.id).then(achievement => {
        self.achievement = achievement;

        return self;
      });
    });

  }

  toProfile(id:number) {
    if(window['WebAppInterface']) {
      window['WebAppInterface'].toProfile(id);
    }
  }

  getScore(presentation:number = 0, cost_performance:number = 0, usability:number = 0) {
    return Math.round((presentation + cost_performance + usability) / 3 * 10) / 10;
  }

  getPosition(company:string, position:string) {
    if(company && position) {
      return `${position}  @  ${company}`;
    } else if(position && !company) {
      return `${position}`;
    } else if(company && !position) {
      return `${position}`;
    }
  }

  getPros(pros : any) {

    if(pros) {
      pros = pros.split('##');
    } else {
      pros = [];
    }

    return pros;
  }

  getCons(cons: any) {
    if(cons) {
      cons = cons.split('##');
    } else {
      cons = [];
    }
    return cons;
  }

  onScrollChange(event:boolean) {
    this.scrollUp = event;
  }

  onFollowerChange(event:boolean) {
    if(event == true) {
      this.achievement.followersAmount++;
    } else {
      this.achievement.followersAmount--;
    }
  }
}
