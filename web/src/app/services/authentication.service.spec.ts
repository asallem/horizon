import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  class MockHttp {};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      {
        provide: HttpClient,
        useClass: MockHttp,
    }]});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
