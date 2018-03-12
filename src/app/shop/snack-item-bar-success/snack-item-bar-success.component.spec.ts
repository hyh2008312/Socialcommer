import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackItemBarSuccessComponent } from './snack-item-bar-success.component';

describe('SnackItemBarSuccessComponent', () => {
  let component: SnackItemBarSuccessComponent;
  let fixture: ComponentFixture<SnackItemBarSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackItemBarSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackItemBarSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
