import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-products-edit-preview',
  templateUrl: './find-products-edit-preview.component.html',
  styleUrls: ['../../store/store.scss', '../shop.scss']
})

export class FindProductsEditPreviewComponent implements OnInit {

  public text = 'Here you let your customers get to know you. Tell them a little bit about yourself and why you create this business.'
    + 'Do you have a passion, hobby or life experience that inspired you to get started? Do you have special skills or training'
    + 'that make you an expert in your field? Show your customers that there are read people with instersting stories working'
    + 'behind the scenes. Helping customers feel connected to you and your purpose will inspire more trust you brad.';

  constructor(
    public router: Router
  ) { }

  ngOnInit():void {

  }

  close():void {
    this.router.navigate(['/shop/products']);
  }

}
