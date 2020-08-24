import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFilterComponent } from './box-filter.component';

describe('BoxFilterComponent', () => {
  let component: BoxFilterComponent;
  let fixture: ComponentFixture<BoxFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
