import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDeleteDialogComponent } from './category-delete-dialog.component';

describe('BlogDeleteDialogComponent', () => {
  let component: BlogDeleteDialogComponent;
  let fixture: ComponentFixture<BlogDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
