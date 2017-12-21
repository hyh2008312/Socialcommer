import {Input, Component, OnInit,EventEmitter,Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop-item-blog-card-4',
  templateUrl: './store-item-blog-card.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class StoreItemBlogCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() blog: any = null;
  @Output() scrollToTop = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  jumpLink() {
    let link = '';
    let baseLink = this.router.url;
    switch (this.status) {
      case 0:
        link = `/blog/${this.blog.id}`;
        break;
      case 1:
        link = `/blog/${this.blog.id}`;
        baseLink = baseLink.split('/blog')[0];
        this.scrollToTop.emit(true);
        break;

    }

    this.router.navigate([baseLink + link]);

  }
}
