import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideMainComponent } from './guide-main.component';

describe('GuideMainComponent', () => {
  let component: GuideMainComponent;
  let fixture: ComponentFixture<GuideMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
