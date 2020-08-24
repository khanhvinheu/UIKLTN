import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamEditComponent } from './sanpham-edit.component';

describe('SanphamEditComponent', () => {
  let component: SanphamEditComponent;
  let fixture: ComponentFixture<SanphamEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanphamEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
