import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydonhangListComponent } from './quanlydonhang-list.component';

describe('QuanlydonhangListComponent', () => {
  let component: QuanlydonhangListComponent;
  let fixture: ComponentFixture<QuanlydonhangListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlydonhangListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlydonhangListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
