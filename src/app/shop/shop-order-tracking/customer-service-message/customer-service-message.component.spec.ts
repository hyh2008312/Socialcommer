import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceMessageComponent } from './customer-service-message.component';

describe('CustomerServiceMessageComponent', () => {
  let component: CustomerServiceMessageComponent;
  let fixture: ComponentFixture<CustomerServiceMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
