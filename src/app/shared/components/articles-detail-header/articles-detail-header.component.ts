import { Input, Component, OnInit, OnChanges} from '@angular/core';

import { ArticlesDetailHeaderService } from './articles-detail-header.service';

import { Joiners, Vote, Joiner } from './articles-detail-header';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-articles-detail-header',
  templateUrl: './articles-detail-header.component.html',
  styleUrls: ['./articles-detail-header.component.scss'],
  providers: [ArticlesDetailHeaderService]
})

export class ArticlesDetailHeaderComponent implements OnInit {

  private active: boolean = false;
  @Input() public showHeader: boolean = false;
  @Input() public interactId: number;
  @Input() public userId: string;
  @Input() public backFrom : string;
  @Input() public voteAmount: number = 0;

  joinId: number;

  joinsed: boolean = false;

  joiners : Joiners = new Joiners();
  vote : Vote = new Vote();
  joiner : Joiner = new Joiner();

  constructor(
    private articlesDetailHeaderService: ArticlesDetailHeaderService
  ) { }


  ngOnInit(): void {

  }

  ngOnChanges(): void{
    if(this.userId != '' && this.interactId) {
      let self = this;

      self.articlesDetailHeaderService.getJoiner(self.interactId,self.userId).then(Joiners => {
        self.joiners = Joiners;
        if(Joiners.results.length > 0) {
          self.vote = Joiners.results[0];
          self.joiner = Joiners.results[0].joiner;
          self.joinId = Joiners.results[0].joiner.id;
        }
        return self;
      });
    }
  }

  toComment(interactId: number, joinId: number) {
    if(window['WebAppInterface']) {
      window['WebAppInterface'].toComment(interactId.toString(),joinId.toString());
    }
  }

  back() {
    if(this.backFrom == 'review') {
      if(window['WebAppInterface']) {
        window['WebAppInterface'].reviewBack();
      }
    } else if(this.backFrom == 'blog') {
      if(window['WebAppInterface']) {
        window['WebAppInterface'].blogBack();
      }
    }
  }

  toVote() {
    if(this.vote.vote == null) {
      if(!this.joinsed) {
        this.joinsed = true;
        this.articlesDetailHeaderService.joins(this.interactId).then(Vote => {
          this.vote = Vote;
          this.joiner = Vote.joiner;
          this.joinId = Vote.joiner.id;

          let self = this;
          self.articlesDetailHeaderService.vote(self.joinId).then(Vote => {
            this.joinsed = false;

            self.vote = Vote;
            self.joiner = Vote.joiner;
            self.joinId = Vote.joiner.id;

            if(Vote.vote == true) {
              self.voteAmount++;
            } else {
              self.voteAmount--;
            }

            return self;
          });

        });
      }
    } else {
      if(!this.joinsed) {
        this.joinsed = true;
        this.articlesDetailHeaderService.vote(this.joinId).then(Vote => {
          this.joinsed = false;

          this.vote = Vote;
          this.joiner = Vote.joiner;
          this.joinId = Vote.joiner.id;

          if(Vote.vote == true) {
            this.voteAmount++;
          } else {
            this.voteAmount--;
          }

          return this;
        });
      }
    }

  }
}
