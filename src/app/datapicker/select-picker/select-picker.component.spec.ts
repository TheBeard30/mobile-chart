import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPickerComponent } from './select-picker.component';

describe('SelectPickerComponent', () => {
  let component: SelectPickerComponent;
  let fixture: ComponentFixture<SelectPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
