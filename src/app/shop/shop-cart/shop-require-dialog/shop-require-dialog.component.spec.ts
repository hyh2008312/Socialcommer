import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRequireDialogComponent } from './shop-require-dialog.component';

describe('ShopRequireDialogComponent', () => {
  let component: ShopRequireDialogComponent;
  let fixture: ComponentFixture<ShopRequireDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopRequireDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRequireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
