import { TestBed } from '@angular/core/testing';

import { PictoService } from './picto.service';

describe('PictoService', () => {
  let service: PictoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
