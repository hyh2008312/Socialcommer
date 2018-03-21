import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSortComponent } from './products-sort.component';

describe('ProductsSortComponent', () => {
  let component: ProductsSortComponent;
  let fixture: ComponentFixture<ProductsSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
