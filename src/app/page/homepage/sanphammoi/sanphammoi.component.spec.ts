import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphammoiComponent } from './sanphammoi.component';

describe('SanphammoiComponent', () => {
  let component: SanphammoiComponent;
  let fixture: ComponentFixture<SanphammoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanphammoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphammoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
