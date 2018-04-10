import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-shop-guide-store-preview',
  templateUrl: './guide-store-preview.component.html',
  styleUrls: ['../_guide.scss']
})

export class GuideStorePreviewComponent implements OnInit {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit():void {

  }

  close():void {
    this.router.navigate(['/shop/guide']);
  }

}
