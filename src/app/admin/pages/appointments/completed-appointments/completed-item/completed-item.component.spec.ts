import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedItemComponent } from './completed-item.component';

describe('CompletedItemComponent', () => {
  let component: CompletedItemComponent;
  let fixture: ComponentFixture<CompletedItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedItemComponent]
    });
    fixture = TestBed.createComponent(CompletedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
