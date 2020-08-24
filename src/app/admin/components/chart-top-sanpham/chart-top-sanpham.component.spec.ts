import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTopSanphamComponent } from './chart-top-sanpham.component';

describe('ChartTopSanphamComponent', () => {
  let component: ChartTopSanphamComponent;
  let fixture: ComponentFixture<ChartTopSanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTopSanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTopSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
