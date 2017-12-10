import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopErrorComponent } from './shop-error.component';

describe('ShopErrorComponent', () => {
  let component: ShopErrorComponent;
  let fixture: ComponentFixture<ShopErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

