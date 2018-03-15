import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStatusChangeDialogComponent } from './store-status-change-dialog.component';

describe('StoreStatusChangeDialogComponent', () => {
  let component: StoreStatusChangeDialogComponent;
  let fixture: ComponentFixture<StoreStatusChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreStatusChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreStatusChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
