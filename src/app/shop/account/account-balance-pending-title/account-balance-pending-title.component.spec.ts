import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBalancePendingTitleComponent } from './account-balance-pending-title.component';

describe('AccountBalancePendingTitleComponent', () => {
  let component: AccountBalancePendingTitleComponent;
  let fixture: ComponentFixture<AccountBalancePendingTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBalancePendingTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBalancePendingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
