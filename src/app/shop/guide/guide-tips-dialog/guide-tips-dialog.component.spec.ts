import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideTipsDialogComponent } from './guide-tips-dialog.component';

describe('GuideTipsDialogComponent', () => {
  let component: GuideTipsDialogComponent;
  let fixture: ComponentFixture<GuideTipsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideTipsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideTipsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
