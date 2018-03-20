import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductCategoryComponent } from './find-product-category.component';

describe('FindProductCategoryComponent', () => {
  let component: FindProductCategoryComponent;
  let fixture: ComponentFixture<FindProductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProductCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
