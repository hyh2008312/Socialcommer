import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store.service';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-shop-template-3',
  templateUrl: './main-page.component.html',
  styleUrls: ['../_store-template-3.scss']
})

export class MainPageComponent implements OnInit {

  storeName: string = 'STORE NAME';
  isDialogOpen: boolean = false;
  text: string = '';
  productNumber:number=0;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private storeService: StoreService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    let self = this;
    self.userService.store.subscribe((data) => {
      if (data) {
        self.storeService.getStore(data.displayName).then((data) => {
          self.text = data.description;
          self.storeService.addStore(data);
        });
      }
    });

  }

  ngOnDestroy() {

  }

  openDialog(event?: any) {
    if (event) {
      return this.isDialogOpen = false;
    }
    this.isDialogOpen = !this.isDialogOpen;
  }

  jumpCart(): void {
    this.router.navigate([`/shop/templates/preview/3/cart`]);
  }

  jumpOrder(): void {
    this.router.navigate([`/shop/templates/preview/3/order`]);
  }

}
