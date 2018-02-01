import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMessageFooterComponent } from './store-message-footer.component';

describe('StoreMessageFooterComponent', () => {
  let component: StoreMessageFooterComponent;
  let fixture: ComponentFixture<StoreMessageFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMessageFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMessageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
