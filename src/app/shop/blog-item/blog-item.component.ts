import { Input, Output, Component, OnInit,EventEmitter, Inject} from '@angular/core';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['../shop.scss']
})

export class BlogItemComponent implements OnInit {

  @Input() blog: any = null;
  @Input() index: number = 0;
  @Output() blogChange = new EventEmitter<any>();


  constructor(

  ) { }

  ngOnInit(): void {

  }

  deleteBlog() {

  }

  editBlog() {

  }

}
