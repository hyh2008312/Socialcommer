import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartMainComponent } from './shop-cart-main.component';

describe('ShopCartMainComponent', () => {
  let component: ShopCartMainComponent;
  let fixture: ComponentFixture<ShopCartMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCartMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
