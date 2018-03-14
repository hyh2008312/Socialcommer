import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShareDialogComponent } from './product-share-dialog.component';

describe('ProductShareDialogComponent', () => {
  let component: ProductShareDialogComponent;
  let fixture: ComponentFixture<ProductShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShareDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
