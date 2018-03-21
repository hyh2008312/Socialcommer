import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTitleComponent } from './account-title.component';

describe('AccountTitleComponent', () => {
  let component: AccountTitleComponent;
  let fixture: ComponentFixture<AccountTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
