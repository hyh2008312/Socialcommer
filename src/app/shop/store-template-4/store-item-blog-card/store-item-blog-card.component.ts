import { Input, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item-blog-card-4',
  templateUrl: './store-item-blog-card.component.html',
  styleUrls: ['../store-template-4.scss']
})

export class StoreItemBlogCardComponent implements OnInit {

  @Input() status: number = 0;
  @Input() blog: any = null;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  jumpLink() {
    let link = '';
    switch (this.status) {
      case 0:
        link = `/detail/${this.blog.id}`;
        break;
      case 1:
        link = `/${this.blog.id}`;
        break;
    }
    this.router.navigate([this.router.url + link]);
  }
}
