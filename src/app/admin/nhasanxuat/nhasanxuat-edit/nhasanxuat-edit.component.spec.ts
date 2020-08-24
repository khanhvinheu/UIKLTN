import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhasanxuatEditComponent } from './nhasanxuat-edit.component';

describe('NhasanxuatEditComponent', () => {
  let component: NhasanxuatEditComponent;
  let fixture: ComponentFixture<NhasanxuatEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhasanxuatEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhasanxuatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
