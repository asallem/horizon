import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  class MockHttp {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      {
        provide: HttpClient,
        useClass: MockHttp,
      }],
      imports: [
        HttpClientModule,
      ]});
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
