import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductsShareComponent } from './find-products-share.component';

describe('FindProductsShareComponent', () => {
  let component: FindProductsShareComponent;
  let fixture: ComponentFixture<FindProductsShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProductsShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProductsShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
