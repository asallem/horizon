import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, mergeMap, of } from 'rxjs';
import { AuthenticationService as AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginFormGroup!: FormGroup;
  errorMessage!: string;

  constructor(private fb:FormBuilder,
              private authenticationService: AuthenticationService,
              private router:Router){
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control(""),
    });
  }

  handleLogin() {
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    this.authenticationService.login(username, password).pipe(
      mergeMap(u => this.authenticationService.authenticate(u)),
      mergeMap(() => this.router.navigateByUrl("/movies")),
      catchError(error => {this.errorMessage = error; return of(`ERROR LOGIN: ${error}`)}),
    ).subscribe()
  }

}
