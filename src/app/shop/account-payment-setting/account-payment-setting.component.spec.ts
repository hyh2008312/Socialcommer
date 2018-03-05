import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPaymentSettingComponent } from './account-payment-setting.component';

describe('AccountPaymentSettingComponent', () => {
  let component: AccountPaymentSettingComponent;
  let fixture: ComponentFixture<AccountPaymentSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPaymentSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPaymentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
