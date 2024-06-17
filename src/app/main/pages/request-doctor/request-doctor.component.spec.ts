import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDoctorComponent } from './request-doctor.component';

describe('RequestDoctorComponent', () => {
  let component: RequestDoctorComponent;
  let fixture: ComponentFixture<RequestDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDoctorComponent]
    });
    fixture = TestBed.createComponent(RequestDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
