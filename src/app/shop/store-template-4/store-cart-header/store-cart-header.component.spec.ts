import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartHeaderComponent } from './store-cart-header.component';

describe('StoreCartHeaderComponent', () => {
  let component: StoreCartHeaderComponent;
  let fixture: ComponentFixture<StoreCartHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCartHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
