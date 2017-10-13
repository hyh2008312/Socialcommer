import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductsComponent, FindProductsDialog } from './find-products.component';

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

describe('FindProductsDialog', () => {
  let component: FindProductsDialog;
  let fixture: ComponentFixture<FindProductsDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ FindProductsDialog ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProductsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
