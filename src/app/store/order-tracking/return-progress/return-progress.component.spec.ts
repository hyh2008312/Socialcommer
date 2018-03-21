import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnProgressComponent } from './return-progress.component';

describe('ReturnProgressComponent', () => {
  let component: ReturnProgressComponent;
  let fixture: ComponentFixture<ReturnProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
