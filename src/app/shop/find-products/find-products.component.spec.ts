import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductsComponent } from './find-products.component';

describe('FindProductsComponent', () => {
  let component: FindProductsComponent;
  let fixture: ComponentFixture<FindProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
