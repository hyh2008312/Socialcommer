import { Input, Output, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog-title',
  templateUrl: './blog-title.component.html',
  styleUrls: ['../_blog.scss']
})

export class BlogTitleComponent implements OnInit {

  @Input() status: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
