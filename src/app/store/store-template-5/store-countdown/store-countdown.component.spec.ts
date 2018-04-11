import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCountdownComponent } from './store-countdown.component';

describe('StoreCountdownComponent', () => {
  let component: StoreCountdownComponent;
  let fixture: ComponentFixture<StoreCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
