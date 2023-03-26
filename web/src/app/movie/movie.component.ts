import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { Movie } from 'src/app/model/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{

  movie!: Movie;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(p => p['id']),
      mergeMap(id => this.movieService.getMovie(id)
    )).subscribe(data => this.movie = data);
  }

  goToList() {
    this.router.navigate(['/movies'])
  }

}
