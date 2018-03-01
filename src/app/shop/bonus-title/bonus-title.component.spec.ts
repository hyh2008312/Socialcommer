import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusTitleComponent } from './bonus-title.component';

describe('BonusTitleComponent', () => {
  let component: BonusTitleComponent;
  let fixture: ComponentFixture<BonusTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
