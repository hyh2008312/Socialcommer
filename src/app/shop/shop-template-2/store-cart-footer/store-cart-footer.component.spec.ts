import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartFooterComponent } from './store-cart-footer.component';

describe('StoreCartFooterComponent', () => {
  let component: StoreCartFooterComponent;
  let fixture: ComponentFixture<StoreCartFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCartFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
