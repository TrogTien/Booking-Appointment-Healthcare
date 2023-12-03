import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalItemComponent } from './medical-item.component';

describe('MedicalItemComponent', () => {
  let component: MedicalItemComponent;
  let fixture: ComponentFixture<MedicalItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalItemComponent]
    });
    fixture = TestBed.createComponent(MedicalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
