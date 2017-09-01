import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsDetailComponent } from './blogs-detail.component';

describe('AnswerDetailComponent', () => {
  let component: BlogsDetailComponent;
  let fixture: ComponentFixture<AnswerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
