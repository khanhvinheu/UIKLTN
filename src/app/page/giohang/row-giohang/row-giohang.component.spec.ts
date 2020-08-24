import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowGiohangComponent } from './row-giohang.component';

describe('RowGiohangComponent', () => {
  let component: RowGiohangComponent;
  let fixture: ComponentFixture<RowGiohangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowGiohangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowGiohangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
