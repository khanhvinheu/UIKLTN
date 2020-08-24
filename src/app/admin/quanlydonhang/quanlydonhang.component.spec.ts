import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydonhangComponent } from './quanlydonhang.component';

describe('QuanlydonhangComponent', () => {
  let component: QuanlydonhangComponent;
  let fixture: ComponentFixture<QuanlydonhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlydonhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlydonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
