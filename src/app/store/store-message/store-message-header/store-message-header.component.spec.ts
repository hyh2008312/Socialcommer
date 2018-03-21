import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMessageHeaderComponent } from './store-message-header.component';

describe('StoreMessageHeaderComponent', () => {
  let component: StoreMessageHeaderComponent;
  let fixture: ComponentFixture<StoreMessageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMessageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMessageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
