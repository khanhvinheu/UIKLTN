import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoanthanhthanhtoanComponent } from './hoanthanhthanhtoan.component';

describe('HoanthanhthanhtoanComponent', () => {
  let component: HoanthanhthanhtoanComponent;
  let fixture: ComponentFixture<HoanthanhthanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoanthanhthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoanthanhthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
