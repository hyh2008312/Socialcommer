import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreateDialogComponent } from './blog-create-dialog.component';

describe('BlogCreateDialogComponent', () => {
  let component: BlogCreateDialogComponent;
  let fixture: ComponentFixture<BlogCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
