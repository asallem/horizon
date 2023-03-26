import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  class MockHttp {};
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      {
        provide: HttpClient,
        useClass: MockHttp,
    }]});
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

