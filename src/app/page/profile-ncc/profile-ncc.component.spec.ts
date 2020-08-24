import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNccComponent } from './profile-ncc.component';

describe('ProfileNccComponent', () => {
  let component: ProfileNccComponent;
  let fixture: ComponentFixture<ProfileNccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
