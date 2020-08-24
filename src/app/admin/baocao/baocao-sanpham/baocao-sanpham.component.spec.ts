import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaoSanphamComponent } from './baocao-sanpham.component';

describe('BaocaoSanphamComponent', () => {
  let component: BaocaoSanphamComponent;
  let fixture: ComponentFixture<BaocaoSanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaoSanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaoSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
