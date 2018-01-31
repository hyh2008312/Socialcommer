import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartPayComponent } from './store-cart-pay.component';

describe('StoreCartPayComponent', () => {
  let component: StoreCartPayComponent;
  let fixture: ComponentFixture<StoreCartPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCartPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
