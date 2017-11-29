import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBlogDetailComponent } from './store-blog-detail.component.ts';

describe('StoreBlogDetailComponent', () => {
  let component: StoreBlogDetailComponent;
  let fixture: ComponentFixture<StoreBlogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBlogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
