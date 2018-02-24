import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReportItemComponent } from './account-report-item.component';

describe('AccountReportItemComponent', () => {
  let component: AccountReportItemComponent;
  let fixture: ComponentFixture<AccountReportItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReportItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
