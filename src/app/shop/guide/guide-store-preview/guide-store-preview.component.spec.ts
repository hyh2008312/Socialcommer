import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideStorePreviewComponent } from './guide-store-preview.component';

describe('GuideStorePreviewComponent', () => {
  let component: GuideStorePreviewComponent;
  let fixture: ComponentFixture<GuideStorePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideStorePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideStorePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
