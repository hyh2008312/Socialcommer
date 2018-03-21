import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticTitleComponent } from './statistic-title.component';

describe('StatisticTitleComponent', () => {
  let component: StatisticTitleComponent;
  let fixture: ComponentFixture<StatisticTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
