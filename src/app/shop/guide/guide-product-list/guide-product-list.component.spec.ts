import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideProductListComponent } from './guide-product-list.component';

describe('GuideProductListComponent', () => {
  let component: GuideProductListComponent;
  let fixture: ComponentFixture<GuideProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
