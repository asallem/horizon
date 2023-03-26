import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as moviesMock from "./movies.json";
import { MovieService } from '../services/movie.service';

import { MoviesComponent } from './movies.component';
import { Movie } from '../model/Movie';
import { of } from 'rxjs';
import { __await } from 'tslib';

describe('MovieComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  const movieService = {
    searchMovies(): any {() => of(moviesMock)},
    getMovies(): void {},
  }
  class MockHttp {};

  beforeEach(async () => {
    spyOn(movieService, 'searchMovies').and.returnValue(of([] as Movie[]));

    await TestBed.configureTestingModule({
      declarations: [ MoviesComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttp,
      },
      { provide: MovieService, useValue: movieService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search only ounce in second ', () => {

    for (let i = 0 ; i < 10; i++ ) {
      component.handleSearchMovies();
    }
    expect(movieService.searchMovies).toHaveBeenCalledTimes(1);

    component.handleSearchMovies();
    const searchTime: Date = new Date();
    searchTime.setSeconds(searchTime.getSeconds() + 1);
    while((searchTime > new Date())) {};
    component.handleSearchMovies();
    expect(movieService.searchMovies).toHaveBeenCalledTimes(2);

});
});
