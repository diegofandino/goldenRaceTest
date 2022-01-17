import { TestBed } from '@angular/core/testing';

import { BallServicesService } from './ball-services.service';

describe('BallServicesService', () => {
  let service: BallServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
