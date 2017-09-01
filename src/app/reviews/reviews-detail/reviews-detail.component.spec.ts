import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsDetailComponent } from './reviews-detail.component';

describe('AnswerDetailComponent', () => {
  let component: AnswerDetailComponent;
  let fixture: ComponentFixture<AnswerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
