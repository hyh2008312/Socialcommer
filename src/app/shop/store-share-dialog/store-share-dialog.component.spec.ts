import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreShareDialogComponent } from './store-share-dialog.component';

describe('StoreShareDialogComponent', () => {
  let component: StoreShareDialogComponent;
  let fixture: ComponentFixture<StoreShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreShareDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
