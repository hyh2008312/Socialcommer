import { Input, Output, Component, OnInit,EventEmitter, Inject} from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShopService } from '../shop.service';

import { CategoryDeleteDialogComponent } from '../category-delete-dialog/category-delete-dialog.component';
import { CategoryEditDialogComponent } from '../category-edit-dialog/category-edit-dialog.component';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['../shop.scss']
})

export class CategoryItemComponent implements OnInit {

  @Input() category: any = null;
  @Input() index: number = 0;
  @Output() categoryChange = new EventEmitter<any>();

  isDelete : boolean = false;
  isEdit: boolean = false;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  deleteCategory() {
    let dialogRef = this.dialog.open(CategoryDeleteDialogComponent, {
      data: {
        category : this.category,
        isDelete: this.isDelete
      }
    });

    let self = this;

    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isDelete == true) {
        self.categoryChange.emit({
          index: self.index,
          category: self.category,
          event: 'delete'
        });
      }
    });
  }

  editCategory() {
    let dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      data: {
        category : this.category,
        isEdit: this.isEdit
      }
    });

    let self = this;
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.data.isEdit == true) {
        self.categoryChange.emit({
          index: self.index,
          category: self.category,
          event: 'edit'
        });
      }
    });
  }

}
