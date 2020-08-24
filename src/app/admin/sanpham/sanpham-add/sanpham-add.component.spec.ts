import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamAddComponent } from './sanpham-add.component';

describe('SanphamAddComponent', () => {
  let component: SanphamAddComponent;
  let fixture: ComponentFixture<SanphamAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanphamAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
