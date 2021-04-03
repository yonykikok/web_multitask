import { TestBed } from '@angular/core/testing';

import { InfoCompartidaService } from './info-compartida.service';

describe('InfoCompartidaService', () => {
  let service: InfoCompartidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoCompartidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
