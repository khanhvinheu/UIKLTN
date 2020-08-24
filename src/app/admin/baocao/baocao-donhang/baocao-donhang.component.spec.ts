import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaoDonhangComponent } from './baocao-donhang.component';

describe('BaocaoDonhangComponent', () => {
  let component: BaocaoDonhangComponent;
  let fixture: ComponentFixture<BaocaoDonhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaoDonhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaoDonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
