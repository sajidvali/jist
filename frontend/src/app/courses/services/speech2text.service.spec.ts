import { TestBed } from '@angular/core/testing';

import { Speech2textService } from './speech2text.service';

describe('Speech2textService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Speech2textService = TestBed.get(Speech2textService);
    expect(service).toBeTruthy();
  });
});
