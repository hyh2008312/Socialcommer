import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopService } from "../shop.service";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['../shop.scss']
})

export class ToDoListComponent implements OnInit {

  editRouter: string = '/shop/store/templates/edit';

  constructor(
    private shopService: ShopService
  ) {

  }

  ngOnInit():void {

    let self = this;
    self.shopService.templateUid.subscribe((data) => {
      if(data) {
        self.editRouter = '/shop/store/templates/edit' + (data==1? '' : '/' + data);
      }
    });

  }

  ngOnDestroy() {


  }


}
