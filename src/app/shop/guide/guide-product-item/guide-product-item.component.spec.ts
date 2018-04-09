import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideProductItemComponent } from './guide-product-item.component';

describe('GuideProductItemComponent', () => {
  let component: GuideProductItemComponent;
  let fixture: ComponentFixture<GuideProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
