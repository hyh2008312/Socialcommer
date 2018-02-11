import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMessageMainComponent } from './store-message-main.component';

describe('StoreMessageMainComponent', () => {
  let component: StoreMessageMainComponent;
  let fixture: ComponentFixture<StoreMessageMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMessageMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMessageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
