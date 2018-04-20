import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopErrorDialogComponent } from './shop-error-dialog.component';

describe('ShopErrorDialogComponent', () => {
  let component: ShopErrorDialogComponent;
  let fixture: ComponentFixture<ShopErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
