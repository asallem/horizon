import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard as AuthenticationGuard } from './guards/authentication';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "movies/:id", component: MovieComponent, canActivate: [AuthenticationGuard]},
  {path: "movies", component: MoviesComponent, canActivate: [AuthenticationGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
