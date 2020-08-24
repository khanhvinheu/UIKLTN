import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaoKhachhangComponent } from './baocao-khachhang.component';

describe('BaocaoKhachhangComponent', () => {
  let component: BaocaoKhachhangComponent;
  let fixture: ComponentFixture<BaocaoKhachhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaoKhachhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaoKhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
