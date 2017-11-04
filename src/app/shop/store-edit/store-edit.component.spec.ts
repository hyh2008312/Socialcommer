import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTemplateComponent } from './store-template.component';

describe('StoreTemplateComponent', () => {
  let component: StoreTemplateComponent;
  let fixture: ComponentFixture<StoreTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
