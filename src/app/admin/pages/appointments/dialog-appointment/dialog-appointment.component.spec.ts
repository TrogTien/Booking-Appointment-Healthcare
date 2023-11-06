import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAppointmentComponent } from './dialog-appointment.component';

describe('DialogAppointmentComponent', () => {
  let component: DialogAppointmentComponent;
  let fixture: ComponentFixture<DialogAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAppointmentComponent]
    });
    fixture = TestBed.createComponent(DialogAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
