import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaikhoanListComponent } from './taikhoan-list.component';

describe('TaikhoanListComponent', () => {
  let component: TaikhoanListComponent;
  let fixture: ComponentFixture<TaikhoanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaikhoanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikhoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
