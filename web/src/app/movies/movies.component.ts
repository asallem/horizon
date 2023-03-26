import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, scan } from 'rxjs';
import { Movie } from '../model/Movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{


  movies! : Array<Movie>;
  searchFormGroup! : FormGroup;
  sortedColumn$ = new BehaviorSubject<string>('');
  searchTime!: Date;

  // the scan operator will let you keep track of the sort direction
  sortMovies$ = this.sortedColumn$.pipe(
    scan<string, {col: string, dir: string}>((sort, val) => {
      return sort.col === val
        ? { col: val, dir: sort.dir === 'desc' ? 'asc' : 'desc' }
        : { col: val, dir: 'desc' }
    }, {dir: 'desc', col: ''})
  )

  constructor(private movieService: MovieService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group(
      {
       searchKeyword: this.fb.control(null),
       filterKeyword: this.fb.control(null),
      }
    )
    this.movies = this.movieService.getMovies();
    this.sortMovies$.pipe(map((sort) => !sort.col ? this.movies : this.sortByColumn(this.movies, sort.col, sort.dir))
    ).subscribe(r => this.movies = r);
  }

  sortByColumn(list: any[] | undefined, column:string, direction = 'desc'): Movie[] {
    let sortedArray = (list || []).sort((a,b)=>{
      if(a[column] > b[column]){
        return (direction === 'desc') ? 1 : -1;
      }
      if(a[column] < b[column]){
        return (direction === 'desc') ? -1 : 1;
      }
      return 0;
    })
    return sortedArray;
  }

  sortOn(column: string) {
    this.sortedColumn$.next(column);
  }

  handleSearchMovies() {
    //console.log('hh handleSearchMovies');
    if(!this.searchTime || this.searchTime <= new Date())  {
      this.searchTime = new Date();
      this.searchTime.setSeconds(this.searchTime.getSeconds() + 1);
      const keyword = this.searchFormGroup.value.searchKeyword;
      this.movieService.searchMovies(keyword).pipe(
        map(data => this.movies = data),
      ).subscribe()
    }
  }

  handleFilterMovies() {
    let keyword = this.searchFormGroup.value.filterKeyword;
    this.movieService.filterMovies(keyword).subscribe(data => this.movies = data)
  }

  details(id: number) {
    this.router.navigate([`/movies/${id}`]);
  }

}
