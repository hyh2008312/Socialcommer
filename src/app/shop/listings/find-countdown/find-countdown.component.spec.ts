import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCountdownComponent } from './find-countdown.component';

describe('FindCountdownComponent', () => {
  let component: FindCountdownComponent;
  let fixture: ComponentFixture<FindCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
