import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Blogs, Owner, Userprofile, CurrentUser, Achievement} from '../blogs';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrls: ['./blogs-detail.component.scss']
})

export class BlogsDetailComponent implements OnInit {

  blogs : Blogs = new Blogs();
  owner : Owner = new Owner();
  userprofile : Userprofile = new Userprofile();
  currentUser : CurrentUser = new CurrentUser();
  achievement : Achievement = new Achievement();

  private userId: string;
  private scrollUp: boolean;

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit():void {

    if(window['WebAppInterface']) {
      this.userId = window['WebAppInterface'].getUserId();
    }

    let id = this.route.snapshot.params['id'];
    this.blogsService.getBlogsDetail(id).then(blogs => {
      this.blogs = blogs;
      this.owner = blogs.owner;
      this.userprofile = blogs.owner.userprofile;
      if(blogs.owner.current_user == null) {
        this.currentUser = {
          follow: false
        };
      } else {
        this.currentUser = blogs.owner.current_user;
      }

      let self = this;

      self.blogsService.getAchievement(self.owner.id).then(achievement => {
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

  getPosition(company:string, position:string) {
    if(company && position) {
      return `${position}  @  ${company}`;
    } else if(position && !company) {
      return `${position}`;
    } else if(company && !position) {
      return `${position}`;
    }
  }

  getDetail(details: string) {
    details = details.replace(/(<p><br><\/p>){3,}/ig, "<p><br></p>");
    return details;
  }

  onScrollChange(event:boolean) {
    this.scrollUp = event;
  }
}
