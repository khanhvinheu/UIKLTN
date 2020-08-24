import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhacungcapTabComponent } from './nhacungcap-tab.component';

describe('NhacungcapTabComponent', () => {
  let component: NhacungcapTabComponent;
  let fixture: ComponentFixture<NhacungcapTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhacungcapTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhacungcapTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
