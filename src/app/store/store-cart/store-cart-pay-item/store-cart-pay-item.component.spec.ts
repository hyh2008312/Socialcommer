import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartPayItemComponent } from './store-cart-pay-item.component';

describe('StoreCartPayItemComponent', () => {
  let component: StoreCartPayItemComponent;
  let fixture: ComponentFixture<StoreCartPayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCartPayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartPayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
