import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartSuccessDialogComponent } from './add-cart-success-dialog.component';

describe('AddCartSuccessDialogComponent', () => {
  let component: AddCartSuccessDialogComponent;
  let fixture: ComponentFixture<AddCartSuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCartSuccessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
