import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentPreviewComponent } from './attachment-preview.component';

describe('AttachmentPreviewComponent', () => {
  let component: AttachmentPreviewComponent;
  let fixture: ComponentFixture<AttachmentPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
