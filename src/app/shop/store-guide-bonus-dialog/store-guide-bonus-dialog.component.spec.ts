import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGuideBonusDialogComponent } from './store-guide-bonus-dialog.component';

describe('StoreGuideBonusDialogComponent', () => {
  let component: StoreGuideBonusDialogComponent;
  let fixture: ComponentFixture<StoreGuideBonusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreGuideBonusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGuideBonusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
