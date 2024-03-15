import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLecturerComponent } from './login-lecturer.component';

describe('LoginLecturerComponent', () => {
  let component: LoginLecturerComponent;
  let fixture: ComponentFixture<LoginLecturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLecturerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
