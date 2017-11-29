import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditComponent } from './store-edit.component';

describe('StoreEditComponent', () => {
  let component: StoreEditComponent;
  let fixture: ComponentFixture<StoreEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
