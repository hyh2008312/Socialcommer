import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersItemComponent } from './orders-item.component';

describe('OrdersItemComponent', () => {
  let component: OrdersItemComponent;
  let fixture: ComponentFixture<OrdersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
