import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBlogComponent } from './store-blog.component';

describe('StoreBlogComponent', () => {
  let component: StoreBlogComponent;
  let fixture: ComponentFixture<StoreBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
