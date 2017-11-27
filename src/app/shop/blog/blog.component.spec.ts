import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent, CatalogAddProductDialog } from './reset-password.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

describe('CatalogAddProductDialog', () => {
  let component: CatalogAddProductDialog;
  let fixture: ComponentFixture<CatalogAddProductDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ CatalogAddProductDialog ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogAddProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
