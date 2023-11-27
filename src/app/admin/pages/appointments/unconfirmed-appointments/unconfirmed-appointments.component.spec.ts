import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmedAppointmentsComponent } from './unconfirmed-appointments.component';

describe('UnconfirmedAppointmentsComponent', () => {
  let component: UnconfirmedAppointmentsComponent;
  let fixture: ComponentFixture<UnconfirmedAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnconfirmedAppointmentsComponent]
    });
    fixture = TestBed.createComponent(UnconfirmedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
