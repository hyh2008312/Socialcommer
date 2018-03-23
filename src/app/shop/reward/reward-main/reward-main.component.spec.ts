import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardMainComponent } from './reward-main.component';

describe('RewardMainComponent', () => {
  let component: RewardMainComponent;
  let fixture: ComponentFixture<RewardMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
