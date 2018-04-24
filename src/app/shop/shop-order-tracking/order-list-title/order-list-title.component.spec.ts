import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListTitleComponent } from './order-list-title.component';

describe('OrderListTitleComponent', () => {
  let component: OrderListTitleComponent;
  let fixture: ComponentFixture<OrderListTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
