import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogEditProductComponent } from './catalog-edit-product.component';

describe('CatalogEditProductComponent', () => {
  let component: CatalogEditProductComponent;
  let fixture: ComponentFixture<CatalogEditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogEditProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
