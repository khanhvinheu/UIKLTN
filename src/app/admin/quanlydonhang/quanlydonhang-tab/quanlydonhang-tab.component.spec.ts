import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydonhangTabComponent } from './quanlydonhang-tab.component';

describe('QuanlydonhangTabComponent', () => {
  let component: QuanlydonhangTabComponent;
  let fixture: ComponentFixture<QuanlydonhangTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlydonhangTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlydonhangTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
