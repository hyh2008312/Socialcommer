import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductsEditComponent } from './find-products-edit.component';

describe('FindProductsEditComponent', () => {
  let component: FindProductsEditComponent;
  let fixture: ComponentFixture<FindProductsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProductsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProductsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
