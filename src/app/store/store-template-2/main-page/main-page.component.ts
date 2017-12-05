import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {Store} from '../../../shop/shop';

@Component({
  selector: 'app-store-template-2',
  templateUrl: './main-page.component.html',
  styleUrls: ['../store-template-2.scss']
})

export class MainPageComponent implements OnInit {
  public shareLink: string;
  public text = '';
  storeName:string;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

  }
  ngOnInit(): void {
    let self = this ;
    this.storeService.store.subscribe((data) => {
      if(data) {
        self.storeName = data.context? data.context.nameTag: data.name;
        self.text = data.description;
      }
    });
  }

  ngOnDestroy() {

  }

}
