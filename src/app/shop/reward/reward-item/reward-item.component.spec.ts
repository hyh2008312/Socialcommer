import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemComponent } from './reward-item.component';

describe('RewardItemComponent', () => {
  let component: RewardItemComponent;
  let fixture: ComponentFixture<RewardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
