import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPasswordDialogComponent } from './setting-password-dialog.component';

describe('SettingsPasswordDialogComponent', () => {
  let component: SettingsPasswordDialogComponent;
  let fixture: ComponentFixture<SettingsPasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPasswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
