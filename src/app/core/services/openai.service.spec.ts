import { TestBed } from '@angular/core/testing';

import { OpenaiService } from './openai.service';
import { provideHttpClient } from '@angular/common/http';

describe('OpenaiService', () => {
  let service: OpenaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(OpenaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
