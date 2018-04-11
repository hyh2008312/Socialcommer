import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreToRewardDialogComponent } from './store-to-reward-dialog.component';

describe('StoreToRewardDialogComponent', () => {
  let component: StoreToRewardDialogComponent;
  let fixture: ComponentFixture<StoreToRewardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreToRewardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreToRewardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
