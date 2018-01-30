import {Input, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-item-blog-card-6',
  templateUrl: './store-item-blog-card.component.html',
  styleUrls: ['../_store-template-6.scss']
})

export class StoreItemBlogCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() blog: any = null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  jumpLink() {
    let link = `/blog/${this.blog.id}`;
    let baseLink = this.router.url.split('/blog')[0] ;
    if (this.status === 1) {
      this.router.navigate([this.router.url + link]);
    }else if (this.status==2){
      this.router.navigate([baseLink + link]);
    }
  }
}
