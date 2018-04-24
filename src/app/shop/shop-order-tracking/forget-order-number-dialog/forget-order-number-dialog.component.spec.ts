import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetOrderNumberDialogComponent } from './forget-order-number-dialog.component';

describe('ForgetOrderNumberDialogComponent', () => {
  let component: ForgetOrderNumberDialogComponent;
  let fixture: ComponentFixture<ForgetOrderNumberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetOrderNumberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetOrderNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
