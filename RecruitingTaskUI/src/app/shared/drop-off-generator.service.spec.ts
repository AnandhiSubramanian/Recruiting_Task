import { TestBed } from '@angular/core/testing';

import { DropOffGeneratorService } from './drop-off-generator.service';

describe('DropOffGeneratorService', () => {
  let service: DropOffGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropOffGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
