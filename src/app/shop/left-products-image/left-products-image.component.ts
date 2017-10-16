import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-left-products-image',
  templateUrl: './left-products-image.component.html',
  styleUrls: ['../shop.scss']
})

export class LeftProductsImageComponent implements OnInit {

  @Input() images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpECZaHv_X20L77tJJ58RHb3JJRG_tfsfhX5Y7po8rZyZJo1KxHA',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpECZaHv_X20L77tJJ58RHb3JJRG_tfsfhX5Y7po8rZyZJo1KxHA',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpECZaHv_X20L77tJJ58RHb3JJRG_tfsfhX5Y7po8rZyZJo1KxHA',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpECZaHv_X20L77tJJ58RHb3JJRG_tfsfhX5Y7po8rZyZJo1KxHA',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpECZaHv_X20L77tJJ58RHb3JJRG_tfsfhX5Y7po8rZyZJo1KxHA'
  ];

  public selectedImage: string;

  constructor(

  ) { }

  ngOnInit():void {
    this.selectedImage = this.images[0];
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

}
