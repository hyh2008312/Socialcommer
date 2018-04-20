import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartProductItemComponent } from './shop-cart-product-item.component';

describe('ShopCartProductItemComponent', () => {
  let component: ShopCartProductItemComponent;
  let fixture: ComponentFixture<ShopCartProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCartProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
