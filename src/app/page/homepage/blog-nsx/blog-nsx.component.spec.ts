import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogNsxComponent } from './blog-nsx.component';

describe('BlogNsxComponent', () => {
  let component: BlogNsxComponent;
  let fixture: ComponentFixture<BlogNsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogNsxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogNsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
