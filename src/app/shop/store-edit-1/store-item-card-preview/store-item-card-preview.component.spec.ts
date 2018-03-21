import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreItemCardPreviewComponent } from './store-item-card-preview.component';

describe('StoreItemCardPreviewComponent', () => {
  let component: StoreItemCardPreviewComponent;
  let fixture: ComponentFixture<StoreItemCardPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreItemCardPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreItemCardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
