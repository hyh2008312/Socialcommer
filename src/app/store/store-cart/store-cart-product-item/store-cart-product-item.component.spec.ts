import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartProductItemComponent } from './store-cart-product-item.component';

describe('StoreCartProductItemComponent', () => {
  let component: StoreCartProductItemComponent;
  let fixture: ComponentFixture<StoreCartProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCartProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
