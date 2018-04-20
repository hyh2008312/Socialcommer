import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartPayComponent } from './shop-cart-pay.component';

describe('ShopCartPayComponent', () => {
  let component: ShopCartPayComponent;
  let fixture: ComponentFixture<ShopCartPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCartPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
