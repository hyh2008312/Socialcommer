import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePreviewComponent } from './store-preview.component';

describe('StorePreviewComponent', () => {
  let component: StorePreviewComponent;
  let fixture: ComponentFixture<StorePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
