import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartMainComponent } from './store-cart-main.component';

describe('StoreCartMainComponent', () => {
  let component: StoreCartMainComponent;
  let fixture: ComponentFixture<StoreCartMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCartMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
