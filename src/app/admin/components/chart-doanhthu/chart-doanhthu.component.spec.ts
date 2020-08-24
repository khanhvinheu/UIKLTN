import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDoanhthuComponent } from './chart-doanhthu.component';

describe('ChartDoanhthuComponent', () => {
  let component: ChartDoanhthuComponent;
  let fixture: ComponentFixture<ChartDoanhthuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDoanhthuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDoanhthuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
