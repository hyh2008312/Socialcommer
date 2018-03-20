import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogAddProductComponent } from './catalog-add-product.component';

describe('CatalogAddProductComponent', () => {
  let component: CatalogAddProductComponent;
  let fixture: ComponentFixture<CatalogAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
