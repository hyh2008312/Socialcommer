import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCodeComponent } from './invite-code.component';

describe('InviteCodeComponent', () => {
  let component: InviteCodeComponent;
  let fixture: ComponentFixture<InviteCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
