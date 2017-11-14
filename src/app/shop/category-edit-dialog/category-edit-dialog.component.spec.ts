import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreateDialogComponent } from './category-edit-dialog.component';

describe('CategoryCreateDialogComponent', () => {
  let component: CategoryCreateDialogComponent;
  let fixture: ComponentFixture<CategoryCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
