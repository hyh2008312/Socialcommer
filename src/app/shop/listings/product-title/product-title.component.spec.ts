import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideNavigationComponent } from './left-side-navigation.component';

describe('LeftSideNavigationComponent', () => {
  let component: LeftSideNavigationComponent;
  let fixture: ComponentFixture<LeftSideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
