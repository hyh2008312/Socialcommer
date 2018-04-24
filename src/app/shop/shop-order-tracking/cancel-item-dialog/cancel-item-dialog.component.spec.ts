import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelItemDialogComponent } from './cancel-item-dialog.component';

describe('CancelItemDialogComponent', () => {
  let component: CancelItemDialogComponent;
  let fixture: ComponentFixture<CancelItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
