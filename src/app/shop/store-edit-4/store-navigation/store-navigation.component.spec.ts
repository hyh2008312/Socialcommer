import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNavigationEditFourComponent } from './store-navigation.component';

describe('StoreNavigationEditFourComponent', () => {
  let component: StoreNavigationEditFourComponent;
  let fixture: ComponentFixture<StoreNavigationEditFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreNavigationEditFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreNavigationEditFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
