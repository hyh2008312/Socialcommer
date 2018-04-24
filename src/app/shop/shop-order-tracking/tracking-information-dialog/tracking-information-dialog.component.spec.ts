import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingInformationDialogComponent } from './tracking-information-dialog.component';

describe('TrackingInformationDialogComponent', () => {
  let component: TrackingInformationDialogComponent;
  let fixture: ComponentFixture<TrackingInformationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingInformationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
