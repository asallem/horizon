import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  class MockHttp {};
  class MockActivatedRoute {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttp,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 2,
            }),
         },
        }
      ],
      imports: [ ReactiveFormsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

