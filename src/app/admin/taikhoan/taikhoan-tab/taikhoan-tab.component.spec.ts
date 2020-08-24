import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaikhoanTabComponent } from './taikhoan-tab.component';

describe('TaikhoanTabComponent', () => {
  let component: TaikhoanTabComponent;
  let fixture: ComponentFixture<TaikhoanTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaikhoanTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikhoanTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
