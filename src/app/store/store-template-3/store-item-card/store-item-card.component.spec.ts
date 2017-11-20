import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreItemCardComponent } from './store-item-card.component.ts';

describe('StoreItemCardComponent', () => {
  let component: StoreItemCardComponent;
  let fixture: ComponentFixture<StoreItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreItemCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
