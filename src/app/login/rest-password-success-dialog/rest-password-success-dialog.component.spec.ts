import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSuccessDialogComponent } from './rest-password-success-dialog.component';

describe('ResetPasswordSuccessDialogComponent', () => {
  let component: ResetPasswordSuccessDialogComponent;
  let fixture: ComponentFixture<ResetPasswordSuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordSuccessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
