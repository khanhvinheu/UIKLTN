import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhacungcapListComponent } from './nhacungcap-list.component';

describe('NhacungcapListComponent', () => {
  let component: NhacungcapListComponent;
  let fixture: ComponentFixture<NhacungcapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhacungcapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhacungcapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
