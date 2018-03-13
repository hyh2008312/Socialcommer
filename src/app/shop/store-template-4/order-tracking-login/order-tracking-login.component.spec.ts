import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingLoginComponent } from './order-tracking-login.component';

describe('OrderTrackingLoginComponent', () => {
  let component: OrderTrackingLoginComponent;
  let fixture: ComponentFixture<OrderTrackingLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTrackingLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
