import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderComponent } from './store-order.component';

describe('StoreOrderComponent', () => {
  let component: StoreOrderComponent;
  let fixture: ComponentFixture<StoreOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
