import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidenhacungcapComponent } from './slidenhacungcap.component';

describe('SlidenhacungcapComponent', () => {
  let component: SlidenhacungcapComponent;
  let fixture: ComponentFixture<SlidenhacungcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidenhacungcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidenhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
