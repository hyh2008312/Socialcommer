import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCategoryComponent } from './store-category.component';

describe('StoreCategoryComponent', () => {
  let component: StoreCategoryComponent;
  let fixture: ComponentFixture<StoreCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
