import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydonhangEditComponent } from './quanlydonhang-edit.component';

describe('QuanlydonhangEditComponent', () => {
  let component: QuanlydonhangEditComponent;
  let fixture: ComponentFixture<QuanlydonhangEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlydonhangEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlydonhangEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
