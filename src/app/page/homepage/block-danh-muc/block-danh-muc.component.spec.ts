import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDanhMucComponent } from './block-danh-muc.component';

describe('BlockDanhMucComponent', () => {
  let component: BlockDanhMucComponent;
  let fixture: ComponentFixture<BlockDanhMucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockDanhMucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
