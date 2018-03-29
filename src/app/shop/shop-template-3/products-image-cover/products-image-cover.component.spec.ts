import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsImageCoverComponent } from './products-image-cover.component';

describe('LeftProductsImageComponent', () => {
  let component: ProductsImageCoverComponent;
  let fixture: ComponentFixture<ProductsImageCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsImageCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsImageCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
