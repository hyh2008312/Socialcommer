import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAvatarComponent } from './store-avatar.component';

describe('StoreAvatarComponent', () => {
  let component: StoreAvatarComponent;
  let fixture: ComponentFixture<StoreAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
