import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideProductDialogComponent } from './guide-product-dialog.component';

describe('GuideProductDialogComponent', () => {
  let component: GuideProductDialogComponent;
  let fixture: ComponentFixture<GuideProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
