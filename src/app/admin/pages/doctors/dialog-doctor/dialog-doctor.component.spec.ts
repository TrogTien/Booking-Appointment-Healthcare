import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDoctorComponent } from './dialog-doctor.component';

describe('DialogDoctorComponent', () => {
  let component: DialogDoctorComponent;
  let fixture: ComponentFixture<DialogDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDoctorComponent]
    });
    fixture = TestBed.createComponent(DialogDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
