import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNavigationComponent } from './store-navigation.component';

describe('StoreNavigationComponent', () => {
  let component: StoreNavigationComponent;
  let fixture: ComponentFixture<StoreNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
