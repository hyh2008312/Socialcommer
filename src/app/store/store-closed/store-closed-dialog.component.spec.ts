import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreClosedDialogComponent } from './store-closed-dialog.component';

describe('StoreClosedDialogComponent', () => {
  let component: StoreClosedDialogComponent;
  let fixture: ComponentFixture<StoreClosedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreClosedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreClosedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
