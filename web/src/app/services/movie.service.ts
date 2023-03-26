import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Movie } from '../model/Movie';
import { MovieDto } from '../model/MovieDto';
import { AuthenticationService } from './authentication.service';
import { MovieHelper } from './movie.helper';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies: Array<Movie> = [];

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  public getMovies(): Array<Movie> {
    return this.movies;
  }

  public setMovies(input: Array<Movie>) {
     this.movies = input;;
  }

  public searchMovies(keyword: string): Observable<Movie[]> {
    return this.http.get<MovieDto[]>(`http://localhost:3000/movies?query=${keyword}`, this.getHeaders())
      .pipe(
        map(data => data.map(e => MovieHelper.deserialize(e))),
        tap(data => this.movies = data),
      );
  }

  public filterMovies(keyword: string): Observable<Movie[]> {
    let movies = this.movies.filter(e => e.title.includes(keyword));
    return of(movies);
  }

  public getMovie(id: string): Observable<Movie> {
    return this.http.get<MovieDto>(`http://localhost:3000/movies/${id}`, this.getHeaders())
      .pipe(map(data => MovieHelper.deserialize(data)));
  }

  private getHeaders() {
    return { headers: { Authorization: 'Bearer ' + this.authService.getToken().token } };
  }
}
