import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarSuccessComponent } from './snack-bar-success.component';

describe('SnackBarSuccessComponent', () => {
  let component: SnackBarSuccessComponent;
  let fixture: ComponentFixture<SnackBarSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
