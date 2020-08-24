import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDangkynhacungcapComponent } from './form-dangkynhacungcap.component';

describe('FormDangkynhacungcapComponent', () => {
  let component: FormDangkynhacungcapComponent;
  let fixture: ComponentFixture<FormDangkynhacungcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDangkynhacungcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDangkynhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
