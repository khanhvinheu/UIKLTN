import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkynhacungcapComponent } from './dangkynhacungcap.component';

describe('DangkynhacungcapComponent', () => {
  let component: DangkynhacungcapComponent;
  let fixture: ComponentFixture<DangkynhacungcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangkynhacungcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkynhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
