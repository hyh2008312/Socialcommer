import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTitleComponent } from './orders-title.component';

describe('OrdersTitleComponent', () => {
  let component: OrdersTitleComponent;
  let fixture: ComponentFixture<OrdersTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
