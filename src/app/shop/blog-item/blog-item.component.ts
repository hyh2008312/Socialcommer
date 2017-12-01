import { Input, Output, Component, OnInit,EventEmitter, Inject} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';

import { BlogDeleteDialogComponent } from '../blog-delete-dialog/blog-delete-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['../shop.scss']
})

export class BlogItemComponent implements OnInit {

  @Input() blog: any = null;
  @Input() index: number = 0;
  @Output() blogChange = new EventEmitter<any>();
  @Input() status: any = 0;

  isDelete : boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  deleteBlog() {
    let dialogRef = this.dialog.open(BlogDeleteDialogComponent, {
      data: {
        blog : this.blog,
        isDelete: this.isDelete
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isDelete == true) {
        self.blogChange.emit({
          index: self.index,
          blog: self.blog,
          event: 'delete'
        });
      }
    });
  }

  editBlog() {
    this.router.navigate([`/shop/blog/${this.blog.id}/edit`], { queryParams: {tab: this.status == 0? 'published':'draft'}});
  }

}
