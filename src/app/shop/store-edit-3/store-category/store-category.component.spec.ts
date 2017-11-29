import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCategoryComponent } from './store-category.component';

describe('CatalogTimeSelectComponent', () => {
  let component: CatalogTimeSelectComponent;
  let fixture: ComponentFixture<CatalogTimeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogTimeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogTimeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
