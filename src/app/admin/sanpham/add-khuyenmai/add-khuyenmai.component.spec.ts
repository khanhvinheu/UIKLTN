import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKhuyenmaiComponent } from './add-khuyenmai.component';

describe('AddKhuyenmaiComponent', () => {
  let component: AddKhuyenmaiComponent;
  let fixture: ComponentFixture<AddKhuyenmaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKhuyenmaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKhuyenmaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
