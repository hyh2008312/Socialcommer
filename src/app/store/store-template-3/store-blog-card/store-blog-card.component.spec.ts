import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBlogCardComponent } from './store-blog-card.component.ts';

describe('StoreBlogCardComponent', () => {
  let component: StoreBlogCardComponent;
  let fixture: ComponentFixture<StoreBlogCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBlogCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
