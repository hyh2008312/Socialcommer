import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListComponent } from './store-list.component.ts';

describe('StoreListComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<StoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
