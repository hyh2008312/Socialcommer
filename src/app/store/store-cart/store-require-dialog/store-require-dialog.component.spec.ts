import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRequireDialogComponent } from './store-require-dialog.component';

describe('StoreRequireDialogComponent', () => {
  let component: StoreRequireDialogComponent;
  let fixture: ComponentFixture<StoreRequireDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreRequireDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRequireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
