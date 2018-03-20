import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-delete-dialog',
  templateUrl: './blog-delete-dialog.component.html',
  styleUrls: ['../_blog.scss']
})

export class BlogDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BlogDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shopService: BlogService
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.dialogRef.close();
  }

  deleteBlog() {
    let self = this;
    self.shopService.deleteBlog({
      id: self.data.blog.id
    }).then((data) => {
      self.data.isDelete = true;
      self.close();
    });
  }

}
