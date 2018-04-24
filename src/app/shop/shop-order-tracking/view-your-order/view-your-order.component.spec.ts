import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewYourOrderComponent } from './view-your-order.component';

describe('ViewYourOrderComponent', () => {
  let component: ViewYourOrderComponent;
  let fixture: ComponentFixture<ViewYourOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewYourOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewYourOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
