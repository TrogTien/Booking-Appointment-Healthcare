import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHourComponent } from './item-hour.component';

describe('ItemHourComponent', () => {
  let component: ItemHourComponent;
  let fixture: ComponentFixture<ItemHourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemHourComponent]
    });
    fixture = TestBed.createComponent(ItemHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
