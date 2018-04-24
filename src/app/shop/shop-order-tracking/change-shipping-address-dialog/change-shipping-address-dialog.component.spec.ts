import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeShippingAddressDialogComponent } from './change-shipping-address-dialog.component';

describe('ChangeShippingAddressDialogComponent', () => {
  let component: ChangeShippingAddressDialogComponent;
  let fixture: ComponentFixture<ChangeShippingAddressDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeShippingAddressDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeShippingAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
