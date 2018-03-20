import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBalancePendingComponent } from './account-balance-pending.component';

describe('AccountBalancePendingComponent', () => {
  let component: AccountBalancePendingComponent;
  let fixture: ComponentFixture<AccountBalancePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBalancePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBalancePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
