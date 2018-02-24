import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReportTitleComponent } from './account-report-title.component';

describe('AccountReportTitleComponent', () => {
  let component: AccountReportTitleComponent;
  let fixture: ComponentFixture<AccountReportTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReportTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReportTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
