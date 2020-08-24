import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhasanxuatAddComponent } from './nhasanxuat-add.component';

describe('NhasanxuatAddComponent', () => {
  let component: NhasanxuatAddComponent;
  let fixture: ComponentFixture<NhasanxuatAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhasanxuatAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhasanxuatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
