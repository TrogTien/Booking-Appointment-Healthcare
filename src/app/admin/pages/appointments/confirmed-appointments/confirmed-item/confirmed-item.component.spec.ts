import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedItemComponent } from './confirmed-item.component';

describe('ConfirmedItemComponent', () => {
  let component: ConfirmedItemComponent;
  let fixture: ComponentFixture<ConfirmedItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmedItemComponent]
    });
    fixture = TestBed.createComponent(ConfirmedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
