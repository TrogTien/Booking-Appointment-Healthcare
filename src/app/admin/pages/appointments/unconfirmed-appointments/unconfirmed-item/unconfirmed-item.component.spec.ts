import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmedItemComponent } from './unconfirmed-item.component';

describe('UnconfirmedItemComponent', () => {
  let component: UnconfirmedItemComponent;
  let fixture: ComponentFixture<UnconfirmedItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnconfirmedItemComponent]
    });
    fixture = TestBed.createComponent(UnconfirmedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
