import { TestBed } from '@angular/core/testing';

import { SelectPickerService } from './select-picker.service';

describe('SelectPickerService', () => {
  let service: SelectPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
