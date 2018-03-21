import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreErrorDialogComponent } from './store-error-dialog.component';

describe('StoreErrorDialogComponent', () => {
  let component: StoreErrorDialogComponent;
  let fixture: ComponentFixture<StoreErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
