import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from  '../../shared/services/user/user.service';

@Component({
  selector: 'app-store-preview',
  templateUrl: './store-preview.component.html',
  styleUrls: ['../../store/store.scss', '../shop.scss']
})

export class StorePreviewComponent implements OnInit {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.router.navigate(['/shop/templates']);
  }

}
