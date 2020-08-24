import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietnhacungcapComponent } from './chitietnhacungcap.component';

describe('ChitietnhacungcapComponent', () => {
  let component: ChitietnhacungcapComponent;
  let fixture: ComponentFixture<ChitietnhacungcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietnhacungcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietnhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
