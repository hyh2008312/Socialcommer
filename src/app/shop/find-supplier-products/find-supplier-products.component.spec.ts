import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSupplierProductsComponent } from './find-supplier-products.component';

describe('FindSupplierProductsComponent', () => {
  let component: FindSupplierProductsComponent;
  let fixture: ComponentFixture<FindSupplierProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindSupplierProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSupplierProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
