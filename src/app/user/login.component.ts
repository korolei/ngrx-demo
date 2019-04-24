import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import {select, Store} from "@ngrx/store";
import * as fromUser from './state/user.reducer';
import {filter} from "rxjs/operators";
import {UserActionTypes} from "./state/user.actions";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private store: Store<fromUser.UserState>,
    private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromUser.getMaskUserName), filter(val => val != undefined)).subscribe(
      maskUserName=> this.maskUserName = maskUserName
    );
  }


  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: UserActionTypes.MaskUserName,
      payload: value
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
