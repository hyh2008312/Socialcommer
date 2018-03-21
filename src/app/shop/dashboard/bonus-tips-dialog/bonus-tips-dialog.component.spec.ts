import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusTipsDialogComponent } from './bonus-tips-dialog.component';

describe('BonusTipsDialogComponent', () => {
  let component: BonusTipsDialogComponent;
  let fixture: ComponentFixture<BonusTipsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusTipsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusTipsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
