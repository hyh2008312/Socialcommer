import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRequestDialogComponent } from './return-request-dialog.component';

describe('ReturnRequestDialogComponent', () => {
  let component: ReturnRequestDialogComponent;
  let fixture: ComponentFixture<ReturnRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
