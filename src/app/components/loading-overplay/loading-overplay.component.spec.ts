import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOverplayComponent } from './loading-overplay.component';

describe('LoadingOverplayComponent', () => {
  let component: LoadingOverplayComponent;
  let fixture: ComponentFixture<LoadingOverplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingOverplayComponent]
    });
    fixture = TestBed.createComponent(LoadingOverplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
