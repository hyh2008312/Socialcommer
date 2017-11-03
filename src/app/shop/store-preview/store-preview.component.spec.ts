import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductsAddProductComponent } from './find-products-add-product.component';

describe('FindProductsAddProductComponent', () => {
  let component: FindProductsAddProductComponent;
  let fixture: ComponentFixture<FindProductsAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProductsAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProductsAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
