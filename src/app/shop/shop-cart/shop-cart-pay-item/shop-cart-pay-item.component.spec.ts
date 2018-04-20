import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartPayItemComponent } from './shop-cart-pay-item.component';

describe('ShopCartPayItemComponent', () => {
  let component: ShopCartPayItemComponent;
  let fixture: ComponentFixture<ShopCartPayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCartPayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartPayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
