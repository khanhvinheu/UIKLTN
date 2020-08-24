import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamlienquanComponent } from './sanphamlienquan.component';

describe('SanphamlienquanComponent', () => {
  let component: SanphamlienquanComponent;
  let fixture: ComponentFixture<SanphamlienquanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanphamlienquanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamlienquanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
