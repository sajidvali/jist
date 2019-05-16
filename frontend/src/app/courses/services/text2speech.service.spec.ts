import { TestBed } from '@angular/core/testing';

import { Text2speechService } from './text2speech.service';

describe('Text2speechService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Text2speechService = TestBed.get(Text2speechService);
    expect(service).toBeTruthy();
  });
});
