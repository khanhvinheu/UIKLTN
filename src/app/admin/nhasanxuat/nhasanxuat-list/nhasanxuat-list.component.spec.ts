import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhasanxuatListComponent } from './nhasanxuat-list.component';

describe('NhasanxuatListComponent', () => {
  let component: NhasanxuatListComponent;
  let fixture: ComponentFixture<NhasanxuatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhasanxuatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhasanxuatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
