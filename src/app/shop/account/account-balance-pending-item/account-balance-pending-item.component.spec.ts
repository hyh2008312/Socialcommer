import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBalancePendingItemComponent } from './account-balance-pending-item.component';

describe('AccountBalancePendingItemComponent', () => {
  let component: AccountBalancePendingItemComponent;
  let fixture: ComponentFixture<AccountBalancePendingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBalancePendingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBalancePendingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
