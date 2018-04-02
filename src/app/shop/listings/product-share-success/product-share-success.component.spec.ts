import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShareSuccessComponent } from './product-share-success.component';

describe('ProductShareSuccessComponent', () => {
  let component: ProductShareSuccessComponent;
  let fixture: ComponentFixture<ProductShareSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShareSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShareSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
