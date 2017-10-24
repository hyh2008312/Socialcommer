import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductsEditPreviewComponent } from './find-products-edit-preview.component';

describe('FindProductsEditPreviewComponent', () => {
  let component: FindProductsEditPreviewComponent;
  let fixture: ComponentFixture<FindProductsEditPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProductsEditPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProductsEditPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
